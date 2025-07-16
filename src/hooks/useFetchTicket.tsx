import { useState, useEffect } from 'react';
import { database } from '../firebase/firebase';
import { ref, onValue } from 'firebase/database';
import { useUser } from '../pages/user';

interface TicketUpdate {
  id: number;
  type: string;
  content: string;
  author: string;
  timestamp: string;
}

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
  description?: string;
  category?: string;
  updates?: TicketUpdate[];
  [key: string]: unknown;
}

export function useFetchTicket(id: string | undefined) {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    if (!id) {
      setError('Ticket ID is required');
      setLoading(false);
      return;
    }
    if (!user?.id) {
      setError('User is not authenticated');
      setLoading(false);
      return;
    }

    const ticketRef = ref(database, `crm_tickets/${id}`);

    const unsubscribe = onValue(
      ticketRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setTicket({ id, ...data });
        } else {
          setTicket(null);
        }
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [id, user?.id]);

  return { ticket, loading, error };
}
