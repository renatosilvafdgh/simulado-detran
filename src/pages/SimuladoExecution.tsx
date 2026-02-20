import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Clock,
    CheckCircle,
    XCircle,
    ArrowRight,
    ArrowLeft,
    Loader2,
    Trophy,
    Home,
    RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { useAuth } from '@/hooks/useAuth';
import {
    getQuestionsByCategory,
    getQuestionsFromPlacasTable,
    saveUserAnswer,
    completeSimulado,
    type Question
} from '@/services/simulado.service';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database.types';

type Simulado = Database['public']['Tables']['simulados']['Row'];

interface UserAnswer {
    questionId: string;
    answer: number;
    isCorrect: boolean;
}

export function SimuladoExecution() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    // const { user } = useAuth(); // User not needed anymore

    const [simulado, setSimulado] = useState<Simulado | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [result, setResult] = useState<{ score: number; correct: number; total: number } | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);

    // Load simulado and questions
    useEffect(() => {
        async function loadSimulado() {
            if (!id) {
                navigate('/simulado');
                return;
            }

            try {
                // Fetch simulado
                const { data: simuladoData, error: simuladoError } = await (supabase as any)
                    .from('simulados')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (simuladoError || !simuladoData) {
                    alert('Simulado não encontrado');
                    navigate('/simulado');
                    return;
                }

                setSimulado(simuladoData);

                // Check if already completed
                if (simuladoData.status === 'completed') {
                    setCompleted(true);
                    setResult({
                        score: simuladoData.score || 0,
                        correct: simuladoData.correct_answers || 0,
                        total: simuladoData.total_questions
                    });
                    setLoading(false);
                    return;
                }

                // Fetch questions
                let questionsData, questionsError;

                // Check if this is a "Placas" related simulado
                // We check for "placa" (case insensitive) or if the default fetch fails, we might fallback?
                // For now, let's prioritize the new table if the category *name* matches likely candidates.
                // Or since the user said "questions with id 1 to 158", maybe it's the "Placas" category.
                if (simuladoData.category_name && simuladoData.category_name.toLowerCase().includes('placa')) {
                    const res = await getQuestionsFromPlacasTable(simuladoData.total_questions);
                    questionsData = res.data;
                    questionsError = res.error;
                } else {
                    const res = await getQuestionsByCategory(
                        simuladoData.category_name,
                        simuladoData.total_questions
                    );
                    questionsData = res.data;
                    questionsError = res.error;
                }

                if (questionsError || !questionsData || questionsData.length === 0) {
                    alert('Erro ao carregar questões');
                    navigate('/simulado');
                    return;
                }

                setQuestions(questionsData);
            } catch (err) {
                console.error('Erro ao carregar simulado:', err);
                alert('Erro ao carregar simulado');
                navigate('/simulado');
            } finally {
                setLoading(false);
            }
        }

        loadSimulado();
    }, [id, navigate]);

    // Timer
    useEffect(() => {
        if (loading || completed) return;

        const interval = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [loading, completed]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAnswerSelect = (answerIndex: number) => {
        if (!showFeedback && !submitting) {
            setSelectedAnswer(answerIndex);
        }
    };

    const handleAction = async () => {
        if (selectedAnswer === null || !simulado) return;

        // If feedback is NOT shown yet, we are "submitting/answering" the current question
        if (!showFeedback) {
            const currentQuestion = questions[currentQuestionIndex];
            const isCorrect = selectedAnswer === currentQuestion.correct_index;

            setSubmitting(true);

            try {
                // Save answer to database (fire and forget generally, or await if critical)
                // We await to ensure partial progress is saved
                await saveUserAnswer(
                    simulado.id,
                    currentQuestion.id,
                    selectedAnswer,
                    currentQuestion.correct_index,
                    timeElapsed
                );

                // Store answer locally
                setUserAnswers([...userAnswers, {
                    questionId: currentQuestion.id,
                    answer: selectedAnswer,
                    isCorrect
                }]);

                // SHOW FEEDBACK
                setShowFeedback(true);
            } catch (err) {
                console.error('Erro ao salvar resposta:', err);
                alert('Erro ao salvar resposta. Tente novamente.');
            } finally {
                setSubmitting(false);
            }
        }
        // If feedback IS shown, we are moving to "Next" question
        else {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedAnswer(null);
                setShowFeedback(false);
            } else {
                await finishSimulado();
            }
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0 && !submitting) {
            // Logic for going back is tricky with immediate feedback because we've already "answered".
            // If we go back, we should probably show the state as "answered" (feedback visible).
            // For now, simple implementation: Go back, populate user's answer, show feedback.

            const prevIndex = currentQuestionIndex - 1;
            const prevAnswer = userAnswers.find(a => a.questionId === questions[prevIndex].id);

            setCurrentQuestionIndex(prevIndex);

            if (prevAnswer) {
                setSelectedAnswer(prevAnswer.answer);
                setShowFeedback(true); // Always show feedback for answered questions
            } else {
                setSelectedAnswer(null);
                setShowFeedback(false);
            }
        }
    };

    const finishSimulado = async () => {
        if (!simulado) return;

        setSubmitting(true);

        try {
            const { data } = await completeSimulado(simulado.id);

            if (data) {
                setCompleted(true);
                setResult({
                    score: data.score || 0,
                    correct: data.correct_answers || 0,
                    total: data.total_questions
                });
            }
        } catch (err) {
            console.error('Erro ao finalizar simulado:', err);
            alert('Erro ao finalizar simulado');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
            </div>
        );
    }

    if (completed && result) {
        const passed = result.score >= 70;

        return (
            <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 text-center">
                        <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${passed ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-red-100 dark:bg-red-900/30'
                            }`}>
                            {passed ? (
                                <Trophy className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
                            ) : (
                                <XCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
                            )}
                        </div>

                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                            {passed ? 'Parabéns! 🎉' : 'Não foi dessa vez! 😔'}
                        </h1>

                        <p className="text-slate-600 dark:text-slate-400 mb-8">
                            {passed
                                ? 'Você foi aprovado no simulado!'
                                : 'Continue estudando e tente novamente.'}
                        </p>

                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4">
                                <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                                    {result.score}%
                                </p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Nota</p>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4">
                                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                    {result.correct}/{result.total}
                                </p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Acertos</p>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4">
                                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                                    {formatTime(timeElapsed)}
                                </p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Tempo</p>
                            </div>
                        </div>

                        <div className="flex gap-4 justify-center">
                            <Button
                                onClick={() => navigate('/simulado')}
                                variant="outline"
                                className="flex items-center gap-2"
                            >
                                <RotateCcw className="h-4 w-4" />
                                Novo Simulado
                            </Button>
                            <Button
                                onClick={() => navigate('/')}
                                className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600"
                            >
                                <Home className="h-4 w-4" />
                                Ir para Home
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    const isAnswerCorrect = selectedAnswer === currentQuestion.correct_index;

    // Get alternatives as array
    const alternatives = [
        currentQuestion.alternative_1,
        currentQuestion.alternative_2,
        currentQuestion.alternative_3,
        currentQuestion.alternative_4
    ];

    return (
        <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Clock className="h-5 w-5 text-emerald-500" />
                            <span className="text-lg font-semibold text-slate-900 dark:text-white">
                                {formatTime(timeElapsed)}
                            </span>
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                            Questão {currentQuestionIndex + 1} de {questions.length}
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Question */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
                        {currentQuestion.question}
                    </h2>

                    <div className="space-y-4 mb-8">
                        {alternatives.map((alternative, index) => {
                            const optionNumber = index + 1;
                            const isSelected = selectedAnswer === optionNumber;
                            const isCorrectOption = currentQuestion.correct_index === optionNumber;

                            // Determine style based on feedback state
                            let borderClass = 'border-slate-200 dark:border-slate-700';
                            let bgClass = '';
                            let textClass = 'text-slate-700 dark:text-slate-300';
                            let icon = null;

                            if (showFeedback) {
                                if (isCorrectOption) {
                                    borderClass = 'border-emerald-500';
                                    bgClass = 'bg-emerald-50 dark:bg-emerald-900/20';
                                    textClass = 'text-emerald-900 dark:text-emerald-100 font-medium';
                                    icon = <CheckCircle className="h-6 w-6 text-emerald-500 flex-shrink-0" />;
                                } else if (isSelected && !isCorrectOption) {
                                    borderClass = 'border-red-500';
                                    bgClass = 'bg-red-50 dark:bg-red-900/20';
                                    textClass = 'text-red-900 dark:text-red-100 font-medium';
                                    icon = <XCircle className="h-6 w-6 text-red-500 flex-shrink-0" />;
                                } else {
                                    // Not selected and not correct - dimmed
                                    bgClass = 'opacity-50';
                                }
                            } else if (isSelected) {
                                borderClass = 'border-emerald-500';
                                bgClass = 'bg-emerald-50 dark:bg-emerald-900/20';
                                textClass = 'text-emerald-900 dark:text-emerald-100 font-medium';
                                icon = <CheckCircle className="h-6 w-6 text-emerald-500 flex-shrink-0 opacity-50" />;
                            } else {
                                // Default hover state
                                borderClass = 'border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors';
                            }

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleAnswerSelect(optionNumber)}
                                    disabled={showFeedback}
                                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${borderClass} ${bgClass}`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-semibold ${showFeedback
                                            ? (isCorrectOption ? 'bg-emerald-500 text-white' : (isSelected ? 'bg-red-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-400'))
                                            : (isSelected ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400')
                                            }`}>
                                            {optionNumber}
                                        </div>
                                        <span className={`flex-1 ${textClass}`}>
                                            {alternative.startsWith('http') ? (
                                                <img
                                                    src={alternative}
                                                    alt={`Opção ${optionNumber}`}
                                                    className="h-24 object-contain max-w-full"
                                                />
                                            ) : (
                                                alternative
                                            )}
                                        </span>
                                        {icon}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Feedback / Explanation Section */}
                    {showFeedback && (
                        <div className={`mb-8 p-4 rounded-xl border-l-4 ${isAnswerCorrect ? 'bg-emerald-50 border-emerald-500 dark:bg-emerald-900/10' : 'bg-red-50 border-red-500 dark:bg-red-900/10'}`}>
                            <h3 className={`font-semibold mb-2 ${isAnswerCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'}`}>
                                {isAnswerCorrect ? 'Resposta Correta!' : 'Resposta Incorreta'}
                            </h3>
                            {currentQuestion.explanation && (
                                <p className="text-slate-600 dark:text-slate-300">
                                    {currentQuestion.explanation}
                                </p>
                            )}
                            {!currentQuestion.explanation && (
                                <p className="text-slate-500 italic">Sem explicação disponível.</p>
                            )}
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex items-center justify-between">
                        <Button
                            onClick={handlePreviousQuestion}
                            disabled={currentQuestionIndex === 0 || submitting} // Disable previous during submission
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Anterior
                        </Button>

                        <Button
                            onClick={handleAction}
                            disabled={selectedAnswer === null || submitting}
                            className={`flex items-center gap-2 text-white ${!showFeedback
                                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
                                : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700'
                                }`}
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Processando...
                                </>
                            ) : !showFeedback ? (
                                <>
                                    Responder
                                    <CheckCircle className="h-4 w-4" />
                                </>
                            ) : currentQuestionIndex === questions.length - 1 ? (
                                <>
                                    Finalizar Simulado
                                    <Trophy className="h-4 w-4" />
                                </>
                            ) : (
                                <>
                                    Próxima Questão
                                    <ArrowRight className="h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
