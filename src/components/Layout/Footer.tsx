
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-6 bg-factsheet-blue/5 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-600 mb-4 md:mb-0">
            © {new Date().getFullYear()} Fund Factsheet Generator. All rights reserved.
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="#" 
              className="text-sm text-gray-600 hover:text-factsheet-blue transition-colors duration-200"
            >
              Terms of Service
            </a>
            <a 
              href="#" 
              className="text-sm text-gray-600 hover:text-factsheet-blue transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-sm text-gray-600 hover:text-factsheet-blue transition-colors duration-200"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
