import { Link } from 'react-router-dom';
import { Mail, MapPin, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">SB</span>
              </div>
              <span className="font-bold text-xl text-white">Simulado Brasil</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              A melhor plataforma de simulados para prova teórica do Detran.
              Estude com questões atualizadas e passe na primeira tentativa.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-emerald-600 flex items-center justify-center transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-emerald-600 flex items-center justify-center transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-emerald-600 flex items-center justify-center transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-emerald-600 flex items-center justify-center transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                  Página Inicial
                </Link>
              </li>
              <li>
                <Link to="/simulado" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                  Simulado
                </Link>
              </li>
              <li>
                <a href="/blog" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                  Blog e Dicas
                </a>
              </li>
              <li>
                <Link to="/sobre-nos" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-emerald-500 mt-0.5" />
                <span className="text-slate-400 text-sm">contato@souhabilitado.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-emerald-500 mt-0.5" />
                <span className="text-slate-400 text-sm">Teresina, PI - Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm text-center md:text-left">
              © {currentYear} Simulado Brasil. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/termos" className="text-slate-500 hover:text-emerald-400 transition-colors text-sm">
                Termos de Uso
              </Link>
              <Link to="/privacidade" className="text-slate-500 hover:text-emerald-400 transition-colors text-sm">
                Política de Privacidade
              </Link>
              <Link to="/aviso-legal" className="text-slate-500 hover:text-emerald-400 transition-colors text-sm">
                Aviso Legal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
