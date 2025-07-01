import { useState, useEffect } from 'react';
import { database } from '../firebase/firebase';
import { ref, onValue, remove } from 'firebase/database';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  role?: string;
  createdAt?: string;
  [key: string]: unknown;
}

export function useFetchUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const usersRef = ref(database, 'crm_table');
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const usersArray = Object.entries(data).map(([id, value]) => ({
          id,
          ...(value as object),
        })) as User[];
        setUsers(usersArray);
      } else {
        setUsers([]);
      }
      setLoading(false);
    }, (err) => {
      setError(err.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const deleteUser = async (id: string) => {
    try {
      await remove(ref(database, `crm_table/${id}`));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to delete user');
      }
    }
  };

  return { users, loading, error, deleteUser };
}
