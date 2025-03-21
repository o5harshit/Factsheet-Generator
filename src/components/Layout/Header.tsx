
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <div className="w-8 h-8 bg-factsheet-blue rounded-md flex items-center justify-center text-white font-bold">
            F
          </div>
          <span className="font-semibold text-xl tracking-tight">Factsheet Generator</span>
        </div>
        
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link 
                to="/" 
                className="text-gray-600 hover:text-factsheet-blue transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/preview" 
                className="text-gray-600 hover:text-factsheet-blue transition-colors duration-200"
              >
                Preview
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
