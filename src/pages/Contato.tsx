import { useState, useRef } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';

export function Contato() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [enviado, setEnviado] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!recaptchaToken) {
      alert('Por favor, complete o desafio reCAPTCHA.');
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.nome,
          email: formData.email,
          subject: formData.assunto,
          message: formData.mensagem,
          'g-recaptcha-response': recaptchaToken,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setEnviado(true);
      alert('Mensagem enviada com sucesso!');
      setTimeout(() => {
        setEnviado(false);
        setFormData({ nome: '', email: '', assunto: '', mensagem: '' });
        setRecaptchaToken(null);
        recaptchaRef.current?.reset();
      }, 3000);
    } catch (error: any) {
      console.error('Erro detalhado EmailJS:', error);
      const errorMsg = error?.text || error?.message || (typeof error === 'string' ? error : JSON.stringify(error));
      const status = error?.status || 'N/A';
      alert(`Erro ao enviar (Status: ${status}): ${errorMsg}. Verifique se todas as chaves no seu ambiente de produção estão corretas.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Entre em Contato
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Tem alguma dúvida, sugestão ou precisa de ajuda?
            Estamos aqui para ajudar você a passar na prova do Detran.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                Informações de Contato
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Email</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      contato@simuladobrasil.com.br
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Telefone</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      (11) 4000-1234
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Localização</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      São Paulo, SP - Brasil
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">
                Dúvidas Frequentes
              </h3>
              <p className="text-emerald-100 text-sm mb-4">
                Antes de enviar uma mensagem, confira se sua dúvida já foi respondida no nosso blog.
              </p>
              <a
                href="/blog"
                className="inline-flex items-center text-sm font-medium hover:underline"
              >
                Ver Blog
                <Send className="h-4 w-4 ml-2" />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 lg:p-8 shadow-lg border border-slate-100 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                Envie uma mensagem
              </h3>

              {enviado ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    Mensagem enviada!
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400">
                    Obrigado pelo contato. Responderemos em breve.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome</Label>
                      <Input
                        id="nome"
                        placeholder="Seu nome"
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="assunto">Assunto</Label>
                    <Input
                      id="assunto"
                      placeholder="Sobre o que você quer falar?"
                      value={formData.assunto}
                      onChange={(e) => setFormData({ ...formData, assunto: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mensagem">Mensagem</Label>
                    <Textarea
                      id="mensagem"
                      placeholder="Escreva sua mensagem..."
                      rows={5}
                      value={formData.mensagem}
                      onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                      required
                    />
                  </div>

                  <div className="flex justify-center py-2 min-h-[78px]">
                    {import.meta.env.VITE_RECAPTCHA_SITE_KEY ? (
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                        onChange={(token) => setRecaptchaToken(token)}
                      />
                    ) : (
                      <div className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
                        Erro: Chave reCAPTCHA não configurada no .env.local
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </span>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Enviar Mensagem
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Configuração de produção validada. 🏁
