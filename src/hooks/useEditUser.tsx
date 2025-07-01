import { useState } from 'react';
import { database } from '../firebase/firebase';
import { ref, update } from 'firebase/database';

interface UserUpdate {
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  role?: string;
  [key: string]: unknown;
}

export function useEditUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateUser = async (id: string, updates: UserUpdate) => {
    setLoading(true);
    setError(null);
    try {
      const userRef = ref(database, `crm_table/${id}`);
      await update(userRef, updates);
      setLoading(false);
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to update user');
      }
      setLoading(false);
      return false;
    }
  };

  return { updateUser, loading, error };
}
