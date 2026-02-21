import { Cookie, ShieldCheck, PieChart, Sliders, MonitorPlay, Link as LinkIcon, Edit, Mail } from 'lucide-react';

export function Cookies() {
    return (
        <div className="min-h-screen pt-24 pb-16 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-3 bg-orange-100 dark:bg-orange-900/30 rounded-2xl mb-4">
                        <Cookie className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
                        Política de Cookies
                    </h1>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6">
                        Última atualização: 21 de fevereiro de 2026
                    </p>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Esta Política de Cookies explica como a <strong className="text-orange-600 dark:text-orange-400 font-bold">Sou Habilitado</strong> utiliza cookies e tecnologias semelhantes em seu site souhabilitado.com.
                    </p>
                </div>

                {/* Content Box */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 md:p-12">

                    <div className="prose prose-slate dark:prose-invert max-w-none">

                        <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg font-medium leading-relaxed">
                            Ao continuar navegando em nossa plataforma, você concorda com o uso de cookies conforme descrito nesta Política, podendo gerenciá-los a qualquer momento nas configurações do seu navegador ou em nosso banner de consentimento.
                        </p>

                        {/* Section 1 */}
                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-teal-100 dark:bg-teal-900/40 p-2 rounded-lg text-teal-600 dark:text-teal-400">
                                    <Cookie className="h-5 w-5" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white m-0">1. O que são Cookies?</h2>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                Cookies são pequenos arquivos de texto armazenados em seu dispositivo (computador, celular ou tablet) quando você acessa um site.
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Eles servem para garantir o funcionamento adequado da plataforma, melhorar sua experiência de navegação e coletar informações para análises e personalização.
                            </p>
                        </div>

                        {/* Section 2 */}
                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-indigo-100 dark:bg-indigo-900/40 p-2 rounded-lg text-indigo-600 dark:text-indigo-400">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white m-0">2. Base Legal</h2>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                O uso de cookies que não sejam estritamente necessários ocorre com base no seu consentimento, conforme previsto na Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018).
                            </p>
                            <div className="bg-indigo-50 dark:bg-indigo-900/20 px-4 py-3 rounded-lg border border-indigo-100 dark:border-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-medium text-sm">
                                Você pode revogar seu consentimento a qualquer momento.
                            </div>
                        </div>

                        {/* Section 3 */}
                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                                    <Sliders className="h-5 w-5" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white m-0">3. Tipos de Cookies Utilizados</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">

                                {/* 3.1 Essenciais */}
                                <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                        <span className="text-emerald-500">🔹</span> 3.1 Essenciais
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">São indispensáveis para o funcionamento do site. Permitem, por exemplo:</p>
                                    <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400 text-sm mb-3">
                                        <li>Login na conta do usuário;</li>
                                        <li>Acesso às áreas seguras;</li>
                                        <li>Processamento de pagamentos.</li>
                                    </ul>
                                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-500">Sem esses cookies, o site pode não funcionar corretamente.</p>
                                </div>

                                {/* 3.2 Desempenho e Análise */}
                                <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                        <PieChart className="h-4 w-4 text-sky-500" /> 3.2 Desempenho e Análise
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">Coletam informações sobre como os usuários utilizam a plataforma, como:</p>
                                    <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400 text-sm mb-3">
                                        <li>Páginas mais acessadas;</li>
                                        <li>Tempo de permanência;</li>
                                        <li>Erros encontrados.</li>
                                    </ul>
                                    <p className="text-xs text-slate-500 dark:text-slate-500 mb-1">Podemos utilizar ferramentas como: <strong>Google Analytics</strong></p>
                                    <p className="text-xs text-slate-500 dark:text-slate-500 italic">Esses dados são utilizados de forma agregada e anônima.</p>
                                </div>

                                {/* 3.3 Funcionalidade */}
                                <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                        <span className="text-purple-500">🔹</span> 3.3 Funcionalidade
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">Permitem que o site memorize preferências do usuário, como:</p>
                                    <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400 text-sm">
                                        <li>Idioma;</li>
                                        <li>Região;</li>
                                        <li>Configurações personalizadas.</li>
                                    </ul>
                                </div>

                                {/* 3.4 Publicidade */}
                                <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                        <MonitorPlay className="h-4 w-4 text-rose-500" /> 3.4 Publicidade
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">Utilizados para:</p>
                                    <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400 text-sm mb-3">
                                        <li>Exibir anúncios relevantes;</li>
                                        <li>Medir desempenho de campanhas;</li>
                                        <li>Limitar repetição de anúncios.</li>
                                    </ul>
                                    <p className="text-xs text-slate-500 dark:text-slate-500 mb-1">Serviços de terceiros: <strong>Meta Ads, Google Ads</strong>.</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-500 italic">Esses fornecedores coletam dados conforme suas próprias políticas.</p>
                                </div>

                            </div>
                        </div>

                        {/* Section 4 & 5 */}
                        <div className="grid md:grid-cols-2 gap-8 mb-10">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                    <LinkIcon className="h-5 w-5 text-gray-500" />
                                    4. Cookies de Terceiros
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 mb-3 text-sm leading-relaxed">
                                    Alguns cookies podem ser definidos por serviços externos integrados ao site, como ferramentas de pagamento, análise de tráfego ou publicidade.
                                </p>
                                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 px-3 py-2 rounded">
                                    Não controlamos diretamente os cookies desses terceiros. Recomendamos a leitura das políticas específicas desses serviços.
                                </div>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                    <Sliders className="h-5 w-5 text-orange-500" />
                                    5. Gerenciamento
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 mb-2 text-sm">Você pode:</p>
                                <ul className="list-disc pl-5 space-y-1 mb-3 text-slate-600 dark:text-slate-400 text-sm">
                                    <li>Aceitar todos os cookies;</li>
                                    <li>Rejeitar cookies não essenciais;</li>
                                    <li>Configurar seu navegador para bloquear ou excluir cookies (Chrome, Firefox, Safari, Edge).</li>
                                </ul>
                                <div className="text-xs font-semibold text-rose-500 bg-rose-50 dark:bg-rose-900/20 px-3 py-2 rounded">
                                    A desativação de cookies essenciais pode afetar o funcionamento do site.
                                </div>
                            </div>
                        </div>

                        {/* Section 6 & 7 */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">6. Retenção de Dados</h2>
                                <p className="text-slate-600 dark:text-slate-400 mb-2">Os cookies podem ser:</p>
                                <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
                                    <li><strong>De sessão:</strong> Expiram ao fechar o navegador;</li>
                                    <li><strong>Persistentes:</strong> Permanecem armazenados por período determinado ou até exclusão manual.</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                    <Edit className="h-5 w-5 text-sky-500" />
                                    7. Alterações nesta Política
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Esta Política poderá ser atualizada periodicamente. A versão mais recente estará sempre disponível em nosso site, com indicação da data de revisão.
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Footer Contact */}
                    <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-700 bg-orange-50/50 dark:bg-orange-900/10 -mx-8 sm:-mx-12 -mb-8 sm:-mb-12 p-8 sm:p-12 rounded-b-3xl">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">8. Contato</h3>
                                <p className="text-slate-500 dark:text-slate-400">Em caso de dúvidas sobre esta Política de Cookies, entre em contato:</p>
                            </div>
                            <a
                                href="mailto:contato@souhabilitado.com"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-semibold transition-colors shadow-sm"
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
