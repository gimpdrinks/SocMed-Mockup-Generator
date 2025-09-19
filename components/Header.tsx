
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          Social Media Ad Generator
        </h1>
        <p className="text-gray-400 text-sm mt-1">Powered by Gemini 2.5 Flash</p>
      </div>
    </header>
  );
};

export default Header;
