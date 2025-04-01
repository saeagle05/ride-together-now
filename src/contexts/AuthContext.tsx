
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

type UserType = 'driver' | 'passenger';

interface User {
  id: string;
  username: string;
  email: string;
  type: UserType;
  profileImage?: string;
  idImage?: string;
  licenseImage?: string;
  carImage?: string;
  rating: number;
  tripCount: number;
  joinDate: string;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  type: UserType;
  idImage?: File;
  licenseImage?: File;
  carImage?: File;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    username: 'john_driver',
    email: 'john@example.com',
    type: 'driver',
    profileImage: '/placeholder.svg',
    rating: 4.8,
    tripCount: 24,
    joinDate: '2022-01-15'
  },
  {
    id: '2',
    username: 'sarah_passenger',
    email: 'sarah@example.com',
    type: 'passenger',
    profileImage: '/placeholder.svg',
    rating: 4.9,
    tripCount: 15,
    joinDate: '2022-03-10'
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { toast } = useToast();

  // Check if a user is already logged in via localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string, password: string) => {
    // In a real app, you would validate the credentials against a backend
    const user = mockUsers.find(u => u.username === username);
    
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(user));
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.username}!`,
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
      throw new Error('Invalid credentials');
    }
  };

  const register = async (userData: RegisterData) => {
    // In a real app, you would send the registration data to a backend
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      username: userData.username,
      email: userData.email,
      type: userData.type,
      profileImage: '/placeholder.svg',
      rating: 5.0,
      tripCount: 0,
      joinDate: new Date().toISOString().split('T')[0]
    };

    // Simulate adding user to the database
    mockUsers.push(newUser);
    
    // Log in the newly registered user
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    toast({
      title: "Registration successful",
      description: `Welcome to Ride with Me, ${newUser.username}!`,
    });
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, login, register, logout }}>
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
