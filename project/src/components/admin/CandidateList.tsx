import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  email: string;
  mobile: string;
  address: string;
}

interface CandidateListProps {
  candidates: Candidate[];
  onUpdate?: (id: string) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}

const CandidateList: React.FC<CandidateListProps> = ({ 
  candidates, 
  onUpdate, 
  onDelete,
  showActions = true 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
            {showActions && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {candidates.map((candidate) => (
            <tr key={candidate.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">{candidate.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{candidate.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{candidate.mobile}</td>
              <td className="px-6 py-4 whitespace-nowrap">{candidate.address}</td>
              {showActions && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-3">
                    {onUpdate && (
                      <button
                        onClick={() => onUpdate(candidate.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(candidate.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateList;