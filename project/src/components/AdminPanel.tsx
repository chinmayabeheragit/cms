import React, { useState } from 'react';
import { PlusCircle, Users, UserX, PenSquare } from 'lucide-react';
import CreateCandidateForm from './admin/CreateCandidateForm';
import CandidateList from './admin/CandidateList';

type ActiveView = 'dashboard' | 'create' | 'view' | 'update' | 'delete';

const AdminPanel: React.FC = () => {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');

  // Mock data - replace with actual data from your backend
  const mockCandidates = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      mobile: '+1234567890',
      address: '123 Main St, City, Country'
    },
    // Add more mock candidates as needed
  ];

  const handleUpdate = (id: string) => {
    console.log('Update candidate:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Delete candidate:', id);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'create':
        return <CreateCandidateForm />;
      case 'view':
        return <CandidateList candidates={mockCandidates} showActions={false} />;
      case 'update':
        return <CandidateList candidates={mockCandidates} onUpdate={handleUpdate} />;
      case 'delete':
        return <CandidateList candidates={mockCandidates} onDelete={handleDelete} />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setActiveView('create')}
            >
              <div className="flex items-center mb-4">
                <PlusCircle className="w-8 h-8 text-green-500 mr-3" />
                <h2 className="text-xl font-semibold">Create Candidate</h2>
              </div>
              <p className="text-gray-600">Add new candidates to the system</p>
            </div>

            <div
              className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setActiveView('view')}
            >
              <div className="flex items-center mb-4">
                <Users className="w-8 h-8 text-blue-500 mr-3" />
                <h2 className="text-xl font-semibold">View Candidates</h2>
              </div>
              <p className="text-gray-600">Browse and manage candidate list</p>
            </div>

            <div
              className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setActiveView('update')}
            >
              <div className="flex items-center mb-4">
                <PenSquare className="w-8 h-8 text-yellow-500 mr-3" />
                <h2 className="text-xl font-semibold">Update Candidates</h2>
              </div>
              <p className="text-gray-600">Modify candidate information</p>
            </div>

            <div
              className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setActiveView('delete')}
            >
              <div className="flex items-center mb-4">
                <UserX className="w-8 h-8 text-red-500 mr-3" />
                <h2 className="text-xl font-semibold">Delete Candidates</h2>
              </div>
              <p className="text-gray-600">Remove candidates from the system</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          {activeView !== 'dashboard' && (
            <button
              onClick={() => setActiveView('dashboard')}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Back to Dashboard
            </button>
          )}
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminPanel;