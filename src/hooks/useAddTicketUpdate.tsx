import { useState } from 'react';
import { database } from '../firebase/firebase';
import { ref, push, update } from 'firebase/database';
import { useUser } from '../pages/user';

interface TicketUpdate {
  type: string;
  content: string;
  author: string;
  timestamp: string;
}

export function useAddTicketUpdate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  const addUpdate = async (ticketId: string, updateData: TicketUpdate) => {
    setLoading(true);
    setError(null);
    try {
      if (!user?.id) {
        throw new Error('User is not authenticated');
      }
      const updatesRef = ref(database, `crm_tickets/${ticketId}/updates`);

      // Add timestamp if not provided
      if (!updateData.timestamp) {
        updateData.timestamp = new Date().toISOString();
      }

      // Add author as current user if not provided
      if (!updateData.author) {
        updateData.author = user.id;
      }

      await push(updatesRef, updateData);

      // Update lastUpdate timestamp on ticket
      const ticketRef = ref(database, `crm_tickets/${ticketId}`);
      await update(ticketRef, { lastUpdate: updateData.timestamp });

      setLoading(false);
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to add ticket update');
      }
      setLoading(false);
      return false;
    }
  };

  return { addUpdate, loading, error };
}
