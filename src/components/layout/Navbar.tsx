import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Sun, Moon, Home, BookOpen, Mail, GraduationCap } from 'lucide-react';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const navLinks = [
  { path: '/', label: 'Início', icon: Home },
  { path: '/simulado', label: 'Simulado', icon: GraduationCap },
  { path: '/blog', label: 'Blog', icon: BookOpen },
  { path: '/contato', label: 'Contato', icon: Mail },
];

export function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg group-hover:shadow-emerald-500/25 transition-shadow">
              <span className="text-white font-bold text-lg">SB</span>
            </div>
            <span className="font-bold text-xl hidden sm:block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Simulado Brasil
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-slate-600" />
              ) : (
                <Sun className="h-5 w-5 text-slate-400" />
              )}
            </Button>

            {/* CTA Button - Desktop */}
            <Link to="/simulado" className="hidden sm:block">
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/25">
                Iniciar Simulado
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-6 mt-8">
                  <div className="flex items-center gap-3 px-2">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                      <span className="text-white font-bold text-xl">SB</span>
                    </div>
                    <span className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      Simulado Brasil
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                          isActive(link.path)
                            ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <link.icon className="h-5 w-5" />
                        <span className="font-medium">{link.label}</span>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-700">
                    <Link to="/simulado" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white">
                        Iniciar Simulado
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
