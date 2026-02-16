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
    saveUserAnswer,
    completeSimulado
} from '@/services/simulado.service';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database.types';

type Question = Database['public']['Tables']['questions_bank']['Row'];
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

                // Fetch questions using category name
                const { data: questionsData, error: questionsError } = await getQuestionsByCategory(
                    simuladoData.category_name,
                    simuladoData.total_questions
                );

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
        setSelectedAnswer(answerIndex);
    };

    const handleNextQuestion = async () => {
        if (selectedAnswer === null || !simulado) return;

        const currentQuestion = questions[currentQuestionIndex];
        const isCorrect = selectedAnswer === currentQuestion.correct_index;

        setSubmitting(true);

        try {
            // Save answer to database
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

            // Move to next question or finish
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedAnswer(null);
            } else {
                await finishSimulado();
            }
        } catch (err) {
            console.error('Erro ao salvar resposta:', err);
            alert('Erro ao salvar resposta. Tente novamente.');
        } finally {
            setSubmitting(false);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            const previousAnswer = userAnswers[currentQuestionIndex - 1];
            if (previousAnswer) {
                setSelectedAnswer(previousAnswer.answer);
            } else {
                setSelectedAnswer(null);
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
                            const isSelected = selectedAnswer === (index + 1);
                            const optionNumber = index + 1;

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleAnswerSelect(optionNumber)}
                                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${isSelected
                                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                                        : 'border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700'
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-semibold ${isSelected
                                            ? 'bg-emerald-500 text-white'
                                            : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                                            }`}>
                                            {optionNumber}
                                        </div>
                                        <span className={`flex-1 ${isSelected
                                            ? 'text-emerald-900 dark:text-emerald-100 font-medium'
                                            : 'text-slate-700 dark:text-slate-300'
                                            }`}>
                                            {alternative}
                                        </span>
                                        {isSelected && (
                                            <CheckCircle className="h-6 w-6 text-emerald-500 flex-shrink-0" />
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between">
                        <Button
                            onClick={handlePreviousQuestion}
                            disabled={currentQuestionIndex === 0}
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Anterior
                        </Button>

                        <Button
                            onClick={handleNextQuestion}
                            disabled={selectedAnswer === null || submitting}
                            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600"
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Salvando...
                                </>
                            ) : currentQuestionIndex === questions.length - 1 ? (
                                <>
                                    Finalizar
                                    <CheckCircle className="h-4 w-4" />
                                </>
                            ) : (
                                <>
                                    Próxima
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
