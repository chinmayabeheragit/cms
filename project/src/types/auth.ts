export interface User {
  id: string;
  email: string;
  role: 'admin' | 'candidate';
  name: string;
  address?: string;
  mobile?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}