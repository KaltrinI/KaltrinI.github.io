import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-6">
      <p>&copy; 2025 Kaltrin Ismaili. All rights reserved.</p>
      <div className="space-x-6">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://linkedin.com/in/kaltrin-ismaili/"
          className="hover:text-gray-300"
        >
          LinkedIn
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/KaltrinI"
          className="hover:text-gray-300"
        >
          GitHub
        </a>
      </div>
      <div className="mt-4 text-sm text-gray-400">
        This site is protected by reCAPTCHA and the Google{' '}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-300"
        >
          Privacy Policy
        </a>{' '}
        and{' '}
        <a
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-300"
        >
          Terms of Service
        </a>{' '}
        apply.
      </div>
    </footer>
  );
};

export default Footer;
