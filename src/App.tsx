import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Home } from '@/pages/Home';
import { Simulado } from '@/pages/Simulado';
import { SimuladoExecution } from '@/pages/SimuladoExecution';
import { Blog } from '@/pages/Blog';
import { BlogPost } from '@/pages/BlogPost';
import { Contato } from '@/pages/Contato';
import { Termos } from '@/pages/Termos';
import { Privacidade } from '@/pages/Privacidade';
import { AvisoLegal } from '@/pages/AvisoLegal';
import { SobreNos } from '@/pages/SobreNos';
import { Cookies } from '@/pages/Cookies';
import { useTheme } from '@/hooks/useTheme';
import { AuthProvider } from '@/contexts/AuthContext';
import { ScrollToTop } from '@/components/ScrollToTop';
import './App.css';

function AppContent() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isSimuladoExecution = location.pathname.includes('/simulado/executar');

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300 overflow-x-hidden flex flex-col">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="flex-grow">
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
