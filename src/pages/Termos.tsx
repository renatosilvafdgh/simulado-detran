import { FileText, Shield, CheckCircle, Cookie, ExternalLink, RefreshCw, Mail } from 'lucide-react';

export function Termos() {
    return (
        <div className="min-h-screen pt-24 pb-16 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl mb-4">
                        <FileText className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
                        Termos de Uso e Serviço
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Seja Bem-Vindo ao site da Sou Habilitado. Antes de explorar tudo o que temos a oferecer, é importante que você entenda e concorde com algumas regras básicas que regem o uso do nosso site <span className="text-emerald-600 dark:text-emerald-400 font-medium">www.souhabilitado.com</span>, e qualquer outro serviço digital que nós oferecemos.
                    </p>
                </div>

                {/* Content Box */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 md:p-12">

                    <div className="prose prose-slate dark:prose-invert max-w-none">
                        <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg font-medium">
                            Ao usar nosso site e serviços, você automaticamente concorda em seguir as regras que estabelecemos aqui. Caso não concorde com algo, por favor, considere não usar nossos serviços. É muito importante para nós que você se sinta seguro e informado a todo momento.
                        </p>

                        {/* Section 1 */}
                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                                    <CheckCircle className="h-5 w-5" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white m-0">1. Aceitando os Termos</h2>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Ao navegar e usar o site da Sou Habilitado, você concorda automaticamente com nossas regras e condições. Estamos sempre procurando melhorar, então esses termos podem mudar de vez em quando. Se fizermos alterações significativas, vamos postar as atualizações aqui no site. Continuar usando o site após essas mudanças significa que você aceita os novos termos.
                            </p>
                        </div>

                        {/* Section 2 */}
                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-emerald-100 dark:bg-emerald-900/40 p-2 rounded-lg text-emerald-600 dark:text-emerald-400">
                                    <Shield className="h-5 w-5" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white m-0">2. Como Usar o Nosso Site</h2>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                A maior parte do nosso site está aberta para você sem a necessidade de cadastro. No entanto, algumas seções especiais podem exigir que você crie uma conta. Pedimos que você seja honesto ao fornecer suas informações e que mantenha sua senha e login seguros. Se decidir compartilhar algum conteúdo conosco, como comentários, por favor, faça-o de maneira respeitosa e dentro da lei.
                            </p>
                        </div>

                        {/* Section 3 */}
                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-purple-100 dark:bg-purple-900/40 p-2 rounded-lg text-purple-600 dark:text-purple-400">
                                    <Shield className="h-5 w-5" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white m-0">3. Sua Privacidade</h2>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                Na Sou Habilitado, a privacidade é um valor essencial. Ao interagir com nosso site, você aceita nossa Política de Privacidade, que detalha nossa abordagem responsável e conforme às leis para o manejo dos seus dados pessoais. Nosso compromisso é com a transparência e a segurança: explicamos como coletamos, usamos e protegemos suas informações, garantindo sua privacidade e oferecendo controle sobre seus dados.
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Adotamos práticas de segurança para proteger suas informações contra acesso não autorizado e compartilhamento indevido, assegurando que qualquer cooperação com terceiros ocorra apenas com base na sua aprovação ou exigências legais claras, reafirmando nosso comprometimento com a sua confiança e segurança digital.
                            </p>
                        </div>

                        {/* Section 4 */}
                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-amber-100 dark:bg-amber-900/40 p-2 rounded-lg text-amber-600 dark:text-amber-400">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white m-0">4. Direitos de Conteúdo</h2>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                O conteúdo disponível no site da Sou Habilitado, incluindo, mas não se limitando a, textos, imagens, ilustrações, designs, ícones, fotografias, programas de computador, videoclipes e áudios, constitui propriedade intelectual protegida tanto pela legislação nacional quanto por tratados internacionais sobre direitos autorais e propriedade industrial. Essa propriedade engloba não apenas materiais diretamente produzidos e publicados por nós, mas também conteúdos que são utilizados sob licença ou permissão de terceiros, garantindo que todos os direitos sejam respeitados conforme as normativas vigentes.
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Ao acessar nosso site, você recebe uma licença limitada, não exclusiva e revogável para visualizar e usar o conteúdo para fins pessoais e não comerciais. Isso implica que qualquer reprodução, distribuição, transmissão ou modificação do conteúdo, sem a devida autorização escrita da Sou Habilitado, é estritamente proibida. Tal restrição visa proteger os direitos de propriedade intelectual associados aos materiais disponibilizados, assegurando que sua utilização não infrinja os direitos dos criadores ou detentores desses direitos, além de promover um ambiente de respeito e valorização da criatividade e inovação.
                            </p>
                        </div>

                        {/* Section 5 */}
                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-orange-100 dark:bg-orange-900/40 p-2 rounded-lg text-orange-600 dark:text-orange-400">
                                    <Cookie className="h-5 w-5" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white m-0">5. Cookies e Mais</h2>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                Utilizamos cookies para melhorar sua experiência, coletando informações anônimas durante sua visita, como suas preferências de idioma, duração da visita, páginas acessadas, e outras estatísticas de uso. Esses dados nos ajudam a personalizar seu conteúdo, otimizar a navegação, melhorar continuamente o site em design e funcionalidade, e garantir sua segurança online. Esta prática é essencial para nos permitir oferecer um serviço mais ajustado às suas necessidades e resolver qualquer problema que possa surgir mais rapidamente.
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Se você preferir limitar ou recusar o uso de cookies, a configuração pode ser ajustada através do seu navegador. Isso pode afetar a sua experiência no site, pois algumas funcionalidades dependem dos cookies para funcionar corretamente. Entendemos a importância do controle sobre suas informações e queremos que você saiba que, ao ajustar as configurações para bloquear cookies, algumas partes do nosso site podem não oferecer a experiência completa pretendida.
                            </p>
                        </div>

                        {/* Section 6 */}
                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-sky-100 dark:bg-sky-900/40 p-2 rounded-lg text-sky-600 dark:text-sky-400">
                                    <ExternalLink className="h-5 w-5" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white m-0">6. Explorando Links Externos</h2>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Nosso site pode incluir links para sites externos que achamos que podem ser do seu interesse. Note que não temos controle sobre esses sites externos e, portanto, não somos responsáveis pelo seu conteúdo ou políticas.
                            </p>
                        </div>

                        {/* Section 7 */}
                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-rose-100 dark:bg-rose-900/40 p-2 rounded-lg text-rose-600 dark:text-rose-400">
                                    <RefreshCw className="h-5 w-5" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white m-0">7. Mudanças e Atualizações</h2>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                A evolução é parte de como operamos, o que significa que estes Termos de Uso podem passar por atualizações para refletir melhor as mudanças em nossos serviços ou na legislação. Sempre que isso acontecer, você encontrará a versão mais recente disponível aqui. Se as mudanças forem significativas, faremos o possível para notificá-lo através dos meios de contato que você nos forneceu.
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Continuar a acessar o site após essas mudanças indica que você concorda com os novos termos. Se, por qualquer motivo, você não concordar com as atualizações, pedimos que não continue utilizando nosso site e serviços.
                            </p>
                        </div>

                    </div>

                    {/* Footer Contact */}
                    <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 -mx-8 sm:-mx-12 -mb-8 sm:-mb-12 p-8 sm:p-12 rounded-b-3xl">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Dúvidas ou Comentários?</h3>
                                <p className="text-slate-500 dark:text-slate-400">Ligue pra gente ou envie um e-mail. Estamos aqui para ajudar.</p>
                            </div>
                            <a
                                href="mailto:contato@souhabilitado.com"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors shadow-sm"
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
