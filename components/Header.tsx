import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 lg:px-8 py-4 flex flex-col items-center text-center">
        <img
          src="https://res.cloudinary.com/dbylka4xx/image/upload/v1751883360/AiForPinoys_Logo_ttg2id.png"
          alt="AiForPinoys Logo"
          className="h-12 w-auto mb-2"
        />
        <h1 className="text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          Social Media Ad Generator
        </h1>
      </div>
    </header>
  );
};

export default Header;