import { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export function Contato() {
  const [enviado, setEnviado] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de envio
    setEnviado(true);
    setTimeout(() => {
      setEnviado(false);
      setFormData({ nome: '', email: '', assunto: '', mensagem: '' });
    }, 3000);
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

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Enviar Mensagem
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
