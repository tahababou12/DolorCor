import React from 'react';
import { Activity } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Activity className="h-8 w-8 text-blue-600" />
          <div className="ml-2">
            <h1 className="text-xl font-bold text-gray-800">MedSymptom</h1>
            <p className="text-xs text-gray-500">Advanced Symptom Checker</p>
          </div>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#" className="text-gray-600 hover:text-blue-600 text-sm font-medium">Home</a></li>
            <li><a href="#" className="text-gray-600 hover:text-blue-600 text-sm font-medium">About</a></li>
            <li><a href="#" className="text-gray-600 hover:text-blue-600 text-sm font-medium">Resources</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
