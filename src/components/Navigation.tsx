import React, { useState } from 'react';
import { FaBars, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    setIsSidebarOpen(false);
  };

  return (
    <header className="bg-gray-800 text-white p-4 sticky top-0 z-50" id='navigationHeader'>
      {/* Parent container for the navigation */}
      <div className="flex justify-between items-center">
        {/* Mobile Hamburger Icon */}
        <button
          className="lg:hidden text-2xl"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          <FaBars />
        </button>
        {/* Left-aligned "My Portfolio" */}
        <div className="text-xl font-semibold">KaltrinI</div>

        {/* Centered Navigation */}
        <nav className="hidden lg:flex justify-center flex-grow space-x-6">
          <ul className="flex space-x-6">
            <li>
              <a
                href="#about"
                className={`hover:text-gray-300 ${activeSection === 'about' ? 'text-gray-300 underline' : ''}`}
                onClick={() => handleNavClick('about')}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className={`hover:text-gray-300 ${activeSection === 'projects' ? 'text-gray-300 underline' : ''}`}
                onClick={() => handleNavClick('projects')}
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={`hover:text-gray-300 ${activeSection === 'contact' ? 'text-gray-300 underline' : ''}`}
                onClick={() => handleNavClick('contact')}
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="https://blog.kaltrini.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 flex items-center"
              >
                Blog <FaExternalLinkAlt className="ml-1" size={14} />
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-50 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex justify-end p-6">
          <button
            className="text-white text-2xl"
            onClick={toggleSidebar}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        </div>
        <nav className="flex flex-col items-center space-y-4">
          <a
            href="#about"
            className={`text-white text-xl hover:text-gray-300 ${activeSection === 'about' ? 'text-gray-300' : ''}`}
            onClick={() => handleNavClick('about')}
          >
            About
          </a>
          <a
            href="#projects"
            className={`text-white text-xl hover:text-gray-300 ${activeSection === 'projects' ? 'text-gray-300' : ''}`}
            onClick={() => handleNavClick('projects')}
          >
            Projects
          </a>
          <a
            href="#contact"
            className={`text-white text-xl hover:text-gray-300 ${activeSection === 'contact' ? 'text-gray-300' : ''}`}
            onClick={() => handleNavClick('contact')}
          >
            Contact
          </a>
          <a
            href="https://blog.kaltrini.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-xl hover:text-gray-300 flex items-center"
          >
            Blog <FaExternalLinkAlt className="ml-1" size={12} />
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
