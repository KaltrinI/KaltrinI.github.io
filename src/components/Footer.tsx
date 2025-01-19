import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-6">
      <p>&copy; 2025 Kaltrin Ismaili. All rights reserved.</p>
      <div className="space-x-6">
        <a target='_blank' href="https://linkedin.com/in/kaltrin-ismaili/" className="hover:text-gray-300">LinkedIn</a>
        <a target='_blank' href="https://github.com/KaltrinI" className="hover:text-gray-300">GitHub</a>
      </div>
    </footer>
  );
};

export default Footer;
