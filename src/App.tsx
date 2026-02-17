import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Home } from '@/pages/Home';
import { Simulado } from '@/pages/Simulado';
import { SimuladoExecution } from '@/pages/SimuladoExecution';
import { Blog } from '@/pages/Blog';
import { BlogPost } from '@/pages/BlogPost';
import { Contato } from '@/pages/Contato';
import { useTheme } from '@/hooks/useTheme';
import { AuthProvider } from '@/contexts/AuthContext';
import './App.css';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/simulado" element={<Simulado />} />
              <Route path="/simulado/executar/:id" element={<SimuladoExecution />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contato" element={<Contato />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
