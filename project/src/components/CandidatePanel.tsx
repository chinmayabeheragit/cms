import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import ProfileForm from './candidate/ProfileForm';

const CandidatePanel: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Candidate Dashboard</h1>
        <ProfileForm user={user} />
      </div>
    </div>
  );
};

export default CandidatePanel;