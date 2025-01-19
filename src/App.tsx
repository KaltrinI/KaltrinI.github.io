import React, { useState, useEffect } from 'react';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import { FaSun, FaMoon } from 'react-icons/fa';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('about');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'about':
        return <About />;
      case 'projects':
        return <Projects />;
      case 'contact':
        return <Contact />;
      default:
        return <About />;
    }
  };

  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LeIprwqAAAAACIsOjtQc-I96AkQvb5ZvBNB_EMB">
      <div className="flex flex-col min-h-screen font-sans antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
        <main className="flex-grow">
          {renderSection()}
        </main>
        {/* Toggle button in the bottom right corner */}
        <button
          onClick={toggleTheme}
          className="fixed bottom-4 right-4 p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 shadow-lg border border-gray-400 dark:border-gray-500"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
        <Footer />
      </div>
    </GoogleReCaptchaProvider>
  );
};

export default App;
