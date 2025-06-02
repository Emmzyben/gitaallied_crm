import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { database } from '../firebase/firebase';
import { ref, child, get } from 'firebase/database';
import { useNotification } from '../components/dashboard/NotificationContext';

// Type definitions
interface UserType {
  id: string;
  usertype: string;
  username?: string;
  email?: string;
  password?: string;
  [key: string]: unknown;
}

interface UserContextType {
  user: UserType | null;
  login: (usernameOrEmail: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create context with default value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Hook to use context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Provider component props
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const navigate = useNavigate();
  const { showNotification } = useNotification();


  // Auto-login from localStorage
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const usertype = localStorage.getItem('usertype');
    if (userId && usertype) {
      setUser({ id: userId, usertype });
    }
  }, []);

  // Fetch all users from Firebase
  const fetchUsers = async (): Promise<Record<string, UserType> | null> => {
    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, 'crm_table'));
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        showNotification({ type: 'error', message: 'No users found.' });
        return null;
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    showNotification({ type: 'error', message: 'Failed to fetch users.' });
      return null;
    }
  };

  // Login function
  const login = async (usernameOrEmail: string, password: string): Promise<void> => {
    try {
      const users = await fetchUsers();
      if (!users) return;

      const userKey = Object.keys(users).find((key) => {
        const u = users[key];
        return (
          (u.username?.trim().toLowerCase() === usernameOrEmail.trim().toLowerCase() ||
           u.email?.trim().toLowerCase() === usernameOrEmail.trim().toLowerCase()) &&
          u.password?.trim() === password.trim()
        );
      });

      if (userKey) {
        const matchedUser = users[userKey];
        localStorage.setItem('userId', userKey);
        localStorage.setItem('usertype', matchedUser.usertype);
        setUser({ ...matchedUser, id: userKey, usertype: matchedUser.usertype });
        showNotification({ type: 'success', message: 'Login successful!' });
        navigateUser(matchedUser.usertype);
      } else {
        showNotification({ type: 'error', message: 'Invalid username/email or password.' });
      }
    } catch (error) {
      console.error('Login failed:', error);
    showNotification({ type: 'error', message: 'Error during login.' });
    }
  };

  // Route user based on type
  const navigateUser = (usertype: string): void => {
    switch (usertype) {
      case 'admin':
        navigate('/dashboard');
        break;
      case 'agent':
        navigate('/dashboard');
        break;
      default:
        navigate('/dashboard');
    }
  };

  // Logout function
  const logout = (): void => {
    localStorage.clear();
    setUser(null);
    navigate('/');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
