import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Home } from '@/pages/Home';
import { useTheme } from '@/hooks/useTheme';
import { AuthProvider } from '@/contexts/AuthContext';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Loader2 } from 'lucide-react';
import './App.css';

// Lazy-loaded routes
const Simulado = lazy(() => import('@/pages/Simulado').then(m => ({ default: m.Simulado })));
const SimuladoExecution = lazy(() => import('@/pages/SimuladoExecution').then(m => ({ default: m.SimuladoExecution })));
const Blog = lazy(() => import('@/pages/Blog').then(m => ({ default: m.Blog })));
const BlogPost = lazy(() => import('@/pages/BlogPost').then(m => ({ default: m.BlogPost })));
const Contato = lazy(() => import('@/pages/Contato').then(m => ({ default: m.Contato })));
const Termos = lazy(() => import('@/pages/Termos').then(m => ({ default: m.Termos })));
const Privacidade = lazy(() => import('@/pages/Privacidade').then(m => ({ default: m.Privacidade })));
const AvisoLegal = lazy(() => import('@/pages/AvisoLegal').then(m => ({ default: m.AvisoLegal })));
const SobreNos = lazy(() => import('@/pages/SobreNos').then(m => ({ default: m.SobreNos })));
const Cookies = lazy(() => import('@/pages/Cookies').then(m => ({ default: m.Cookies })));

// Loading Fallback Component
const PageLoader = () => (
  <div className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
    <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
  </div>
);

function AppContent() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isSimuladoExecution = location.pathname.includes('/simulado/executar');

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300 overflow-x-hidden flex flex-col">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/simulado" element={<Simulado />} />
            <Route path="/simulado/executar/:id" element={<SimuladoExecution />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/termos" element={<Termos />} />
            <Route path="/privacidade" element={<Privacidade />} />
            <Route path="/aviso-legal" element={<AvisoLegal />} />
            <Route path="/sobre-nos" element={<SobreNos />} />
            <Route path="/cookies" element={<Cookies />} />
          </Routes>
        </Suspense>
      </main>
      {!isSimuladoExecution && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
