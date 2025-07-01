import { useState } from 'react';
import { database } from '../firebase/firebase';
import { ref, push, set } from 'firebase/database';
import { useUser } from '../pages/user';

interface Customer {
  name: string;
  email: string;
  phone?: string;
  [key: string]: unknown;
}

export function useCustomers() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  const addCustomer = async (customer: Customer) => {
    const userId = user?.id;
    if (!userId) {
      throw new Error('User is not authenticated');
    }

    if (!customer.name || !customer.email) {
      setError('Name and email are required');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const customersRef = ref(database, 'crm_customers');
      const newCustomerRef = push(customersRef);
      const customerWithMeta = {
        ...customer,
        addedBy: userId,
        createdAt: Date.now(),
      };
      await set(newCustomerRef, customerWithMeta);
      return newCustomerRef.key;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to add customer');
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { addCustomer, loading, error };
}
