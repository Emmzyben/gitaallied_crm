import { useState, useEffect } from 'react';
import { database } from '../firebase/firebase';
import { ref, onValue } from 'firebase/database';


interface Ticket {
  id: string;
  title?: string;
  subject?: string;
  customer?: string;
  priority?: string;
  status?: string;
  created?: string;
  agent?: string;
  lastUpdate?: string;
  userId?: string;
  [key: string]: unknown;
}

export function useFetchAllTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ticketsRef = ref(database, 'crm_tickets');

    const unsubscribe = onValue(
      ticketsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const loadedTickets: Ticket[] = Object.entries(data)
            .map(([key, value]) => ({
              id: key,
              ...(value as object),
            }));

          setTickets(loadedTickets);
        } else {
          setTickets([]);
        }
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { tickets, loading, error };
}
