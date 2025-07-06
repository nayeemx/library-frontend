import { FaHeart, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="text-sm">Made with</span>
            <FaHeart className="text-red-500" />
            <span className="text-sm">for Library Management</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
              title="GitHub Repository"
            >
              <FaGithub size={20} />
            </a>
            <span className="text-sm text-gray-300">
              © 2024 Library Management System
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 