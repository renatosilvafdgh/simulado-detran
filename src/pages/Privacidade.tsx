import { Shield, CheckCircle, Database, Globe, Mail } from 'lucide-react';

export function Privacidade() {
    return (
        <div className="min-h-screen pt-24 pb-16 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-4">
                        <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
                        Política de Privacidade
                    </h1>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6">
                        Última atualização: 21 de fevereiro de 2026
                    </p>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Bem-vindo à Sou Habilitado, com sede na Avenida Presidente Jânio Quadros, 420, Teresina – PI. Nosso compromisso é com a integridade, transparência e segurança dos dados pessoais dos nossos usuários.
                    </p>
                </div>

                {/* Content Box */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 md:p-12">

                    <div className="prose prose-slate dark:prose-invert max-w-none">
                        <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg font-medium">
                            Esta Política de Privacidade aplica-se a todas as interações realizadas por meio do site souhabilitado.com, serviços associados, aplicativos móveis e demais plataformas digitais sob nosso controle. Ao acessar e utilizar nossas plataformas, você declara estar ciente das práticas descritas nesta Política.
                        </p>

                        {/* Section 1 */}
                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-emerald-100 dark:bg-emerald-900/40 p-2 rounded-lg text-emerald-600 dark:text-emerald-400">
                                    <CheckCircle className="h-5 w-5" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white m-0">1. Definições</h2>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">Para os fins desta Política:</p>
                            <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-400">
                                <li><strong>Dados Pessoais:</strong> Informações que identificam ou podem identificar uma pessoa natural.</li>
                                <li><strong>Dados Pessoais Sensíveis:</strong> Dados sobre origem racial ou étnica, convicção religiosa, opinião política, filiação sindical, dados referentes à saúde ou vida sexual, dados genéticos ou biométricos.</li>
                                <li><strong>Tratamento:</strong> Toda operação realizada com dados pessoais, como coleta, produção, recepção, classificação, uso, acesso, reprodução, armazenamento, eliminação, compartilhamento, entre outros.</li>
                                <li><strong>Leis de Proteção de Dados:</strong> Legislação aplicável à proteção de dados pessoais, especialmente a LGPD (Lei nº 13.709/2018).</li>
                            </ul>
                        </div>

                        {/* Section 2 */}
                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-indigo-100 dark:bg-indigo-900/40 p-2 rounded-lg text-indigo-600 dark:text-indigo-400">
                                    <Database className="h-5 w-5" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white m-0">2. Dados Coletados</h2>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">Podemos coletar os seguintes dados:</p>

                            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">2.1 Dados fornecidos por você</h3>
                            <ul className="list-disc pl-5 space-y-1 mb-4 text-slate-600 dark:text-slate-400">
                                <li>Nome e sobrenome</li>
                                <li>E-mail</li>
                                <li>Telefone</li>
                                <li>Endereço (quando necessário)</li>
                                <li>Informações de pagamento</li>
                                <li>Informações fornecidas em formulários ou atendimento</li>
                            </ul>

                            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">2.2 Dados coletados automaticamente</h3>
                            <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
                                <li>Endereço IP</li>
                                <li>Tipo de navegador e dispositivo</li>
                                <li>Sistema operacional</li>
                                <li>Fuso horário</li>
                                <li>Páginas acessadas</li>
                                <li>Tempo de navegação</li>
                                <li>Origem do acesso (ex: mecanismos de busca)</li>
                                <li>Interações com a plataforma</li>
                            </ul>
                        </div>

                        {/* Section 3 */}
                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-amber-100 dark:bg-amber-900/40 p-2 rounded-lg text-amber-600 dark:text-amber-400">
                                    <CheckCircle className="h-5 w-5" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white m-0">3. Finalidade do Tratamento</h2>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">Utilizamos os dados para:</p>
                            <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
                                <li>Operar e disponibilizar os simulados e serviços oferecidos;</li>
                                <li>Processar pagamentos;</li>
                                <li>Criar e gerenciar contas de usuário;</li>
                                <li>Enviar comunicações administrativas;</li>
                                <li>Enviar ofertas e conteúdos promocionais (quando autorizado);</li>
                                <li>Melhorar a experiência do usuário;</li>
                                <li>Cumprir obrigações legais e regulatórias;</li>
                                <li>Prevenir fraudes e garantir segurança da plataforma.</li>
                            </ul>
                        </div>

                        {/* Section 4 */}
                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-purple-100 dark:bg-purple-900/40 p-2 rounded-lg text-purple-600 dark:text-purple-400">
                                    <Shield className="h-5 w-5" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white m-0">4. Base Legal para o Tratamento</h2>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">O tratamento de dados poderá ocorrer com fundamento em:</p>
                            <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
                                <li>Execução de contrato;</li>
                                <li>Cumprimento de obrigação legal;</li>
                                <li>Exercício regular de direitos;</li>
                                <li>Legítimo interesse;</li>
                                <li>Consentimento do titular, quando necessário.</li>
                            </ul>
                        </div>

                        {/* Sections 5 & 6 */}
                        <div className="grid md:grid-cols-2 gap-8 mb-10">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                    <Globe className="h-5 w-5 text-sky-500" />
                                    5. Cookies e Rastreamento
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 mb-2">Tipos de cookies que usamos:</p>
                                <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400 text-sm">
                                    <li><strong>Essenciais:</strong> Necessários para funcionamento.</li>
                                    <li><strong>Desempenho:</strong> Avaliam uso da plataforma.</li>
                                    <li><strong>Funcionalidade:</strong> Memorizam preferências.</li>
                                    <li><strong>Publicidade:</strong> Exibem anúncios relevantes.</li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                    <Database className="h-5 w-5 text-rose-500" />
                                    6. Compartilhamento
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 mb-2">Podemos compartilhar dados com:</p>
                                <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400 text-sm">
                                    <li>Processadores de pagamento;</li>
                                    <li>Serviços de hospedagem e tecnologia;</li>
                                    <li>Plataformas de marketing e análise;</li>
                                    <li>Autoridades públicas, quando exigido por lei.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Sections 7, 8, 9, 10, 11, 12 */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">7. Transferência Internacional de Dados</h2>
                                <p className="text-slate-600 dark:text-slate-400">Caso utilizemos serviços hospedados fora do Brasil, garantiremos que a transferência ocorra em conformidade com a LGPD, mediante cláusulas contratuais ou mecanismos adequados de proteção.</p>
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">8. Direitos do Titular</h2>
                                <p className="text-slate-600 dark:text-slate-400 mb-2">Você pode, a qualquer momento:</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600 dark:text-slate-400">
                                    <div className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5" /> Confirmar existência e acessar dados</div>
                                    <div className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5" /> Corrigir dados incompletos ou desatualizados</div>
                                    <div className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5" /> Solicitar anonimização, bloqueio ou eliminação</div>
                                    <div className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5" /> Solicitar portabilidade ou revogar consentimento</div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">9. Segurança da Informação</h2>
                                <p className="text-slate-600 dark:text-slate-400">Adotamos medidas técnicas e organizacionais adequadas para proteger os dados pessoais contra acesso não autorizado, perda, alteração ou divulgação indevida. Em caso de incidente de segurança relevante, notificaremos o titular e as autoridades competentes.</p>
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">10. Retenção de Dados</h2>
                                <p className="text-slate-600 dark:text-slate-400">Os dados serão mantidos pelo tempo necessário para cumprir as finalidades descritas, enquanto durar a relação contratual, para cumprimento de obrigações legais, ou para exercício regular de direitos. Após esse período, os dados poderão ser eliminados ou anonimizados.</p>
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">11. Links Externos</h2>
                                <p className="text-slate-600 dark:text-slate-400">Nosso site pode conter links para plataformas de terceiros como Google, Meta e Microsoft. Não somos responsáveis pelas práticas de privacidade desses serviços. Recomendamos a leitura das respectivas políticas.</p>
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">12. Alterações desta Política</h2>
                                <p className="text-slate-600 dark:text-slate-400">Esta Política poderá ser atualizada a qualquer momento. A versão mais recente estará sempre disponível em nosso site, com indicação da data de atualização.</p>
                            </div>
                        </div>

                    </div>

                    {/* Footer Contact */}
                    <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 -mx-8 sm:-mx-12 -mb-8 sm:-mb-12 p-8 sm:p-12 rounded-b-3xl">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">13. Encarregado (DPO)</h3>
                                <p className="text-slate-500 dark:text-slate-400">Caso deseje tratar assuntos relacionados à proteção de dados, entre em contato:</p>
                            </div>
                            <a
                                href="mailto:contato@souhabilitado.com"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors shadow-sm"
                            >
                                <Mail className="h-5 w-5" />
                                contato@souhabilitado.com
                            </a>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
