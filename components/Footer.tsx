import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-700">
      <div className="container mx-auto px-4 lg:px-8 py-4 text-center text-gray-400 text-sm">
        Created by{' '}
        <a
          href="https://aiforpinoys.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-purple-400 hover:text-purple-300 transition-colors"
        >
          AiForPinoys
        </a>
      </div>
    </footer>
  );
};

export default Footer;
