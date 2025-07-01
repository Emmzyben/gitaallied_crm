import { useState, useEffect } from 'react';
import { database } from '../firebase/firebase';
import { ref, onValue, remove } from 'firebase/database';
import { useUser } from '../pages/user';

interface Customer {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  status?: string;
  lastContact?: string;
  addedBy?: string;
  [key: string]: unknown;
}

export function useFetchCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const userId = user?.id;
    if (!userId) {
      setCustomers([]);
      setLoading(false);
      setError('User is not authenticated');
      return;
    }

    const customersRef = ref(database, 'crm_customers');

    const unsubscribe = onValue(
      customersRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const customersArray = Object.entries(data)
            .map(
              ([id, value]) =>
                ({
                  id,
                  ...(value as object),
                } as Customer)
            )
            .filter((customer) => customer.addedBy === userId);

          setCustomers(customersArray);
        } else {
          setCustomers([]);
        }
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const deleteCustomer = async (id: string) => {
    try {
      await remove(ref(database, `crm_customers/${id}`));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to delete customer');
      }
    }
  };

  return { customers, loading, error, deleteCustomer };
}
