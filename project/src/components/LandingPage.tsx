import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center text-white">
          <Users className="w-20 h-20 mb-8" />
          <h1 className="text-5xl font-bold mb-6">Candidate Management System</h1>
          <p className="text-xl mb-12 max-w-2xl">
            Streamline your recruitment process with our powerful candidate management system.
            Track applications, manage candidates, and make better hiring decisions.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg
                     hover:bg-blue-50 transition-colors duration-200 shadow-lg"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;