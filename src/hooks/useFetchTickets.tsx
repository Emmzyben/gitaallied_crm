import { useState, useEffect } from 'react';
import { database } from '../firebase/firebase';
import { ref, onValue, remove } from 'firebase/database';
import { useUser } from '../pages/user';

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

export function useFetchTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    if (!user?.id) {
      setError('User is not authenticated');
      setLoading(false);
      return;
    }

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
            }))
            .filter(ticket => (ticket as Ticket).userId === user.id); // filter by logged-in user ID

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
  }, [user?.id]);

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
