import { useState } from 'react';
import { database } from '../firebase/firebase';
import { ref, update } from 'firebase/database';

interface CustomerUpdate {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  lastContact?: string;
  [key: string]: unknown;
}

export function useEditCustomer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateCustomer = async (id: string, updates: CustomerUpdate) => {
    setLoading(true);
    setError(null);
    try {
      const customerRef = ref(database, `crm_customers/${id}`);
      await update(customerRef, updates);
      setLoading(false);
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to update customer');
      }
      setLoading(false);
      return false;
    }
  };

  return { updateCustomer, loading, error };
}
