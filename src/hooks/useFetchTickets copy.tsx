import { useState, useEffect } from 'react';
import { database } from '../firebase/firebase';
import { ref, onValue, remove } from 'firebase/database';

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
  [key: string]: unknown;
}

export function useFetchTickets() {
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
          const loadedTickets: Ticket[] = Object.entries(data).map(([key, value]) => ({
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

  const deleteTicket = async (id: string) => {
    try {
      await remove(ref(database, `crm_tickets/${id}`));
      return true;
    } catch {
      return false;
    }
  };

  return { tickets, loading, error, deleteTicket };
}
