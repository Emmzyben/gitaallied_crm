import { useState } from 'react';
import { database } from '../firebase/firebase';
import { ref, push, set } from 'firebase/database';
import { useUser } from '../pages/user';

interface Ticket {
  customer: string;
  customerEmail?: string;
  customerPhone?: string;
  subject: string;
  description?: string;
  priority?: string;
  agent?: string;
  status?: string;
  created?: string;
  lastUpdate?: string;
  [key: string]: unknown;
}

export function useCreateTicket() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
    const { user } = useUser();

  const createTicket = async (ticket: Ticket) => {
    setLoading(true);
    setError(null);
    try {
      const ticketsRef = ref(database, 'crm_tickets');
      const newTicketRef = push(ticketsRef);

      // Set created and lastUpdate timestamps if not provided
      const now = new Date().toISOString();
      if (!ticket.created) {
        ticket.created = now;
      }
      if (!ticket.lastUpdate) {
        ticket.lastUpdate = now;
      }
     
      const userId = user?.id;
      if (!userId) {
        throw new Error('User is not authenticated');
      }
      // Add userId to ticket
      ticket.userId = userId;

      await set(newTicketRef, ticket);
      setLoading(false);
      return newTicketRef.key;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to create ticket');
      }
      setLoading(false);
      return null;
    }
  };

  return { createTicket, loading, error };
}
