import { useState } from 'react';
import Navbar from './components/Navbar';
import AboutModal from './components/AboutModal';
import InputCard from './components/InputCard';
import ResultCard from './components/ResultCard';
import Footer from './components/Footer';
import Spinner from './components/Spinner';
import Toast from './components/Toast';

function App() {
  // State for active pada tab
  const [activePada, setActivePada] = useState(0);
  // State for theme, modal, input, result, loading, error, toast
  const [darkMode, setDarkMode] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [input, setInput] = useState('');
  const [hasSeparators, setHasSeparators] = useState(true);
  const [script, setScript] = useState('auto');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

  // Theme toggle handler
  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle('dark');
  };

  // About modal close handler
  const closeAbout = () => setShowAbout(false);

  // Detect Chandas API handler
  const handleDetect = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    setToast({ show: false, message: '', type: 'info' });
    try {
      const res = await fetch('/identify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: input,
          script,
          has_separators: hasSeparators,
        }),
      });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      setResult(data);
      setToast({ show: true, message: 'Chandas detected successfully!', type: 'success' });
    } catch (err) {
      setError('API failed. Showing demo result.');
      setResult({
        meter: 'Mandakranta',
        type: 'syllabic',
        confidence: 0.92,
        padas: [
          {
            text: 'vande gurūṇāṁ caraṇāravinde',
            syllables: ['van','de','gu','rū','ṇāṁ','ca','ra','ṇā','ra','vin','de'],
            lg: ['g','l','g','g','g','l','g','l','g','l','g'],
            ganas: ['ya','ma','ta','ra','ja'],
            tail: ['l'],
          },
        ],
        alternates: [
          { meter: 'Vasantatilaka', confidence: 0.61 },
          { meter: 'Sikharini', confidence: 0.54 },
        ],
      });
      setToast({ show: true, message: 'API failed. Showing demo result.', type: 'error' });
    }
    setLoading(false);
  };

  // Clear input/result
  const handleClear = () => {
    setInput('');
    setResult(null);
    setError('');
    setToast({ show: true, message: 'Cleared input and result.', type: 'info' });
  };

  // Try sample
  const handleSample = () => {
    setInput('vande gurūṇāṁ caraṇāravinde | ... ||');
    setResult(null);
    setError('');
    setToast({ show: true, message: 'Sample loaded.', type: 'success' });
  };

  // Main layout
  return (
    <div className={darkMode ? 'dark bg-gradient-to-br from-indigo-900 via-gray-950 to-indigo-700 min-h-screen transition-all duration-500' : 'bg-gradient-to-br from-blue-50 via-white to-purple-100 min-h-screen transition-all duration-500'}>
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} openAbout={() => setShowAbout(true)} />
      <AboutModal show={showAbout} onClose={closeAbout} />
      <Toast
        message={toast.message}
        type={toast.type}
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
      />
      <main className="max-w-4xl mx-auto p-6 flex flex-col gap-12">
        <div className="rounded-2xl shadow-2xl bg-white/90 dark:bg-gray-950/90 border border-gray-200 dark:border-gray-800 p-8 mb-8 transition-all duration-300">
          <InputCard
            input={input}
            setInput={setInput}
            hasSeparators={hasSeparators}
            setHasSeparators={setHasSeparators}
            script={script}
            setScript={setScript}
            loading={loading}
            handleDetect={handleDetect}
            handleClear={handleClear}
            handleSample={handleSample}
          />
        </div>
        {loading ? (
          <Spinner />
        ) : result ? (
          <div className="rounded-2xl shadow-2xl bg-white/90 dark:bg-gray-950/90 border border-gray-200 dark:border-gray-800 p-8 transition-all duration-300">
            <ResultCard
              loading={loading}
              result={result}
              activePada={activePada}
              setActivePada={setActivePada}
            />
          </div>
        ) : null}
        {error && (
          <div className="bg-gradient-to-r from-amber-100 to-rose-100 text-warning rounded-xl p-4 border border-amber-300 shadow-lg text-base font-bold text-center animate-pulse mt-4">{error}</div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
