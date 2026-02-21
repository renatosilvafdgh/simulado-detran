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

    // Get alternatives as array
    const alternatives = [
        currentQuestion.alternative_1,
        currentQuestion.alternative_2,
        currentQuestion.alternative_3,
        currentQuestion.alternative_4
    ];

    const allImages = alternatives.every(alt => typeof alt === 'string' && alt.startsWith('http'));

    return (
        <div className="min-h-screen pt-20 pb-8 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Main Content - Left Side */}
                    <div className="flex-1 flex flex-col w-full">
                        {/* Removed Status Bar - Information moved to Navigation Sidebar */}

                        {/* Question Box */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-3 sm:p-4 flex-grow mb-4">
                            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug mb-3">
                                {currentQuestion.question}
                            </h2>

                            <div className={allImages ? "grid grid-cols-1 sm:grid-cols-2 gap-3" : "space-y-2"}>
                                {alternatives.map((alternative, index) => {
                                    const optionNumber = index + 1;
                                    const letter = String.fromCharCode(65 + index); // A, B, C, D
                                    const isSelected = selectedAnswer === optionNumber;
                                    const isCorrectOption = currentQuestion.correct_index === optionNumber;

                                    let containerClass = "group relative flex cursor-pointer rounded-lg border bg-white dark:bg-slate-800 transition-all overflow-hidden shadow-sm active:scale-[0.99] touch-manipulation ";
                                    let letterBoxClass = "flex items-center justify-center w-10 sm:w-12 font-bold text-sm border-r transition-colors ";
                                    let contentBoxClass = "py-2 px-3 sm:py-3 sm:px-4 flex-1 text-sm font-medium leading-normal flex items-center ";
                                    let icon = null;

                                    if (showFeedback) {
                                        if (isCorrectOption) {
                                            containerClass += "border-emerald-500 dark:border-emerald-500 z-10";
                                            letterBoxClass += "bg-emerald-500 text-white border-emerald-500";
                                            contentBoxClass += "text-slate-900 dark:text-white font-semibold bg-emerald-50 dark:bg-emerald-900/20";
                                            icon = <div className="flex items-center pr-4 text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"><CheckCircle className="h-5 w-5 border-none" /></div>;
                                        } else if (isSelected && !isCorrectOption) {
                                            containerClass += "border-red-500 dark:border-red-500 z-10";
                                            letterBoxClass += "bg-red-500 text-white border-red-500";
                                            contentBoxClass += "text-slate-900 dark:text-white font-semibold bg-red-50 dark:bg-red-900/20";
                                            icon = <div className="flex items-center pr-4 text-red-500 bg-red-50 dark:bg-red-900/20"><XCircle className="h-5 w-5 border-none" /></div>;
                                        } else {
                                            containerClass += "border-slate-200 dark:border-slate-700 opacity-60";
                                            letterBoxClass += "bg-slate-50 dark:bg-slate-700/50 text-slate-500 border-slate-200 dark:border-slate-700";
                                            contentBoxClass += "text-slate-700 dark:text-slate-300";
                                        }
                                    } else {
                                        if (isSelected) {
                                            containerClass += "border-blue-500 dark:border-blue-500 ring-1 ring-blue-500 z-10";
                                            letterBoxClass += "bg-blue-500 text-white border-blue-500";
                                            contentBoxClass += "text-slate-900 dark:text-white font-semibold bg-blue-50 dark:bg-blue-900/20";
                                        } else {
                                            containerClass += "border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500";
                                            letterBoxClass += "bg-slate-50 dark:bg-slate-700/50 text-slate-500 border-slate-200 dark:border-slate-700 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600";
                                            contentBoxClass += "text-slate-700 dark:text-slate-300";
                                        }
                                    }

                                    return (
                                        <label key={index} className={containerClass}>
                                            <input
                                                type="radio"
                                                name="question"
                                                className="sr-only"
                                                checked={isSelected}
                                                onChange={() => handleAnswerSelect(optionNumber)}
                                                disabled={showFeedback}
                                            />
                                            <div className="flex items-stretch w-full">
                                                <div className={letterBoxClass}>
                                                    {letter}
                                                </div>
                                                <div className={`${contentBoxClass} ${alternative.startsWith('http') ? '!p-1 flex justify-center' : ''}`}>
                                                    {alternative.startsWith('http') ? (
                                                        <img
                                                            src={alternative}
                                                            alt={`Opção ${letter}`}
                                                            className="h-16 sm:h-20 object-contain max-w-full rounded-md"
                                                        />
                                                    ) : (
                                                        alternative
                                                    )}
                                                </div>
                                                {icon}
                                            </div>
                                        </label>
                                    );
                                })}
                            </div>

                            {/* Feedback Section (if applicable) */}
                            {showFeedback && currentQuestion.explanation && (
                                <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-sm text-slate-600 dark:text-slate-300">
                                    <span className="font-semibold text-slate-800 dark:text-white block mb-1">Explicação:</span>
                                    {currentQuestion.explanation}
                                </div>
                            )}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={handlePreviousQuestion}
                                disabled={currentQuestionIndex === 0 || submitting}
                                className="order-2 sm:order-1 flex-1 sm:flex-none py-3 px-6 rounded-full border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 font-semibold flex justify-center items-center gap-2 transition-all text-sm active:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ArrowLeft className="h-5 w-5" />
                                Anterior
                            </button>

                            <button
                                onClick={handleAction}
                                disabled={selectedAnswer === null || submitting}
                                className="order-1 sm:order-2 flex-1 py-3 px-6 rounded-full bg-blue-500 hover:bg-blue-600 border border-blue-500 text-white font-bold shadow-md flex justify-center items-center gap-2 transition-all active:scale-95 text-sm disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Processando...
                                    </>
                                ) : !showFeedback ? (
                                    <>
                                        Responder
                                        <CheckCircle className="h-5 w-5 border-none" />
                                    </>
                                ) : currentQuestionIndex === questions.length - 1 ? (
                                    <>
                                        Finalizar Simulado
                                        <Trophy className="h-5 w-5" />
                                    </>
                                ) : (
                                    <>
                                        Próxima Questão
                                        <ArrowRight className="h-5 w-5" />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Sidebar - Right Side (Desktop only usually, but matches image) */}
                    <div className="w-full lg:w-80 flex flex-col gap-4">
                        {/* Status & Navigation Grid */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 sm:p-5">
                            {/* Status Section Moved Here */}
                            <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100 dark:border-slate-700">
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                                        <Clock className="h-3.5 w-3.5" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Tempo</span>
                                    </div>
                                    <div className="text-lg font-bold font-mono text-slate-800 dark:text-white leading-none">
                                        {formatTime(timeElapsed)}
                                    </div>
                                </div>
                                <div className="text-right flex flex-col items-end">
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Questão</div>
                                    <div className="text-lg font-bold text-slate-800 dark:text-white leading-none">
                                        {currentQuestionIndex + 1} <span className="text-sm font-normal text-slate-400">/ {questions.length}</span>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">Navegação</h3>
                            <div className="flex lg:grid gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 hide-scrollbar" style={{ gridTemplateColumns: 'repeat(5, minmax(0, 1fr))' }}>
                                {questions.map((_, idx) => {
                                    const isCurrent = idx === currentQuestionIndex;
                                    const isAnswered = idx < currentQuestionIndex;

                                    let btnClass = "h-10 w-10 lg:w-full rounded-xl flex-shrink-0 flex items-center justify-center font-bold text-sm transition-colors border ";

                                    if (isCurrent) {
                                        btnClass += "bg-blue-600 text-white border-blue-600 shadow-md";
                                    } else if (isAnswered) {
                                        const answer = userAnswers.find(a => a.questionId === questions[idx].id);
                                        if (answer) {
                                            if (answer.isCorrect) {
                                                btnClass += "bg-emerald-100/50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-400";
                                            } else {
                                                btnClass += "bg-red-100/50 text-red-700 border-red-200 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400";
                                            }
                                        } else {
                                            btnClass += "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800/50 dark:text-emerald-500";
                                        }
                                    } else {
                                        btnClass += "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700";
                                    }

                                    return (
                                        <button
                                            key={idx}
                                            className={btnClass}
                                            disabled
                                        >
                                            {isAnswered && !isCurrent ? <CheckCircle className="h-4 w-4 opacity-70" /> : idx + 1}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="flex justify-between items-center px-1 mt-6">
                                <div className="flex flex-col items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Feito</span>
                                </div>
                                <div className="flex flex-col items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Atual</span>
                                </div>
                                <div className="flex flex-col items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Falta</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
