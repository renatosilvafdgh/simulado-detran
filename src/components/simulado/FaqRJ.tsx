import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqRJ() {
    const faqs = [
        {
            question: "📌 O que é o simulado do Detran RJ primeira habilitação?",
            answer: (
                <>
                    <p className="mb-2">
                        O simulado do Detran RJ primeira habilitação é um teste online baseado no mesmo formato da prova oficial aplicada pelo Detran do Rio de Janeiro. Ele contém questões sobre legislação de trânsito, placas, direção defensiva, primeiros socorros, meio ambiente e cidadania.
                    </p>
                    <p>
                        No <a href="https://souhabilitado.com" className="text-emerald-600 dark:text-emerald-400 underline font-semibold">Sou Habilitado</a>, o simulado segue o padrão atualizado da banca, ajudando você a treinar exatamente como será no dia da prova real.
                    </p>
                </>
            ),
        },
        {
            question: "📌 Onde fazer simulado Detran RJ grátis?",
            answer: (
                <>
                    <p className="mb-2">
                        Você pode fazer simulado Detran RJ grátis diretamente no site <a href="https://souhabilitado.com" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">souhabilitado.com</a>, sem necessidade de cadastro obrigatório.
                    </p>
                    <p className="mb-2">Nosso simulado online Detran RJ:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-2">
                        <li>É 100% gratuito</li>
                        <li>Possui questões atualizadas para 2026</li>
                        <li>Simula o tempo real da prova</li>
                        <li>Mostra correção automática com explicação</li>
                    </ul>
                    <p>
                        Treinar gratuitamente aumenta suas chances de aprovação logo na primeira tentativa.
                    </p>
                </>
            ),
        },
        {
            question: "📌 Como funciona o simulado online Detran RJ?",
            answer: (
                <>
                    <p className="mb-2">
                        O simulado online Detran RJ funciona exatamente como a prova oficial:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 mb-2">
                        <li>30 questões de múltipla escolha</li>
                        <li>Tempo cronometrado</li>
                        <li>Conteúdo baseado no edital atualizado</li>
                        <li>Resultado imediato</li>
                    </ul>
                    <p>
                        O objetivo é preparar você para a prova teórica do Detran RJ, reduzindo ansiedade e aumentando sua confiança.
                    </p>
                </>
            ),
        },
        {
            question: "📌 O simulado Detran RJ 2026 está atualizado?",
            answer: (
                <>
                    <p className="mb-2">
                        Sim. O simulado Detran RJ 2026 do <a href="https://souhabilitado.com" className="text-emerald-600 dark:text-emerald-400 underline font-semibold">Sou Habilitado</a> é atualizado conforme mudanças na legislação de trânsito e no formato da prova.
                    </p>
                    <p>
                        Isso é fundamental, porque pequenas alterações nas regras podem impactar diretamente o resultado da sua prova teórica Detran RJ.
                    </p>
                </>
            ),
        },
        {
            question: "📌 Como é a prova teórica do Detran RJ?",
            answer: (
                <>
                    <p className="mb-2">
                        A prova teórica do Detran RJ é composta por 30 questões objetivas. Para ser aprovado, o candidato precisa acertar pelo menos 21 questões (70%).
                    </p>
                    <p className="mb-2">Os temas cobrados incluem:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-2">
                        <li>Legislação de trânsito</li>
                        <li>Placas de sinalização</li>
                        <li>Direção defensiva</li>
                        <li>Primeiros socorros</li>
                        <li>Meio ambiente</li>
                        <li>Mecânica básica</li>
                    </ul>
                    <p>
                        Fazer o Detran RJ prova teórica simulado aumenta significativamente as chances de aprovação.
                    </p>
                </>
            ),
        },
        {
            question: "📌 O Detran RJ simulado prova é igual à prova oficial?",
            answer: (
                <>
                    <p className="mb-2">
                        O Detran RJ simulado prova do <a href="https://souhabilitado.com" className="text-emerald-600 dark:text-emerald-400 underline font-semibold">Sou Habilitado</a> é baseado no padrão real da banca. Embora as perguntas não sejam idênticas às oficiais, o formato, nível de dificuldade e temas são muito semelhantes.
                    </p>
                    <p className="mb-2">Isso permite que você:</p>
                    <ul className="list-none space-y-1">
                        <li>✔ Treine sob pressão</li>
                        <li>✔ Identifique seus pontos fracos</li>
                        <li>✔ Aumente sua taxa de acerto</li>
                    </ul>
                </>
            ),
        },
        {
            question: "📌 Preciso fazer simulado mesmo estudando a apostila?",
            answer: (
                <>
                    <p className="mb-2">Sim. Apenas ler o conteúdo não é suficiente.</p>
                    <p className="mb-2">O simulado detran rj online ajuda você a:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-2">
                        <li>Memorizar melhor o conteúdo</li>
                        <li>Entender como as questões são cobradas</li>
                        <li>Aprender a interpretar pegadinhas</li>
                    </ul>
                    <p>
                        Quem faz pelo menos 5 simulados antes da prova tem muito mais segurança no exame oficial.
                    </p>
                </>
            ),
        },
        {
            question: "📌 O exame psicotécnico Detran RJ reprova muita gente?",
            answer: (
                <>
                    <p className="mb-2">
                        O exame psicotécnico Detran RJ avalia atenção, raciocínio lógico, coordenação motora e equilíbrio emocional.
                    </p>
                    <p>
                        Ele não exige estudo tradicional como a prova teórica, mas exige concentração e tranquilidade. Dormir bem e manter a calma no dia é essencial.
                    </p>
                </>
            ),
        },
        {
            question: "📌 O simulado ajuda na renovação CNH RJ?",
            answer: (
                <>
                    <p className="mb-2">
                        Na renovação CNH RJ, normalmente não é necessário refazer a prova teórica, exceto em casos específicos determinados pelo Detran.
                    </p>
                    <p>
                        Mas se houver exigência de prova, fazer o simulado detran rj grátis ajuda você a revisar rapidamente o conteúdo e evitar surpresas.
                    </p>
                </>
            ),
        },
        {
            question: "📌 Quantos simulados devo fazer antes da prova?",
            answer: (
                <>
                    <p className="mb-2">O ideal é:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-2">
                        <li>Fazer pelo menos 5 a 10 simulados completos</li>
                        <li>Repetir até atingir média de 80% ou mais de acertos</li>
                        <li>Revisar os erros antes de refazer</li>
                    </ul>
                    <p>
                        No <a href="https://souhabilitado.com" className="text-emerald-600 dark:text-emerald-400 underline font-semibold">Sou Habilitado</a>, você pode refazer o simulado do Detran RJ primeira habilitação quantas vezes quiser.
                    </p>
                </>
            ),
        },
    ];

    return (
        <div className="w-full max-w-4xl mx-auto mt-16 pb-16 px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center uppercase tracking-tight">
                FAQ - SIMULADO DETRAN RJ
            </h2>
            <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                    <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-2xl px-6 transition-all data-[state=open]:bg-white dark:data-[state=open]:bg-slate-800 data-[state=open]:shadow-md"
                    >
                        <AccordionTrigger className="text-left text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-200 hover:no-underline py-5">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed pb-6">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
