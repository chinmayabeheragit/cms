import React, { createContext, useContext, useState } from 'react';
import { AuthContextType, User } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Mock login - replace with real authentication
    if (email === 'admin@example.com' && password === 'admin123') {
      setUser({
        id: '1',
        email,
        role: 'admin',
        name: 'Admin User'
      });
    } else if (email === 'candidate@example.com' && password === 'candidate123') {
      setUser({
        id: '2',
        email,
        role: 'candidate',
        name: 'John Doe'
      });
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};