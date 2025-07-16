import { useState } from 'react';
import { database } from '../firebase/firebase';
import { ref, update } from 'firebase/database';

export function useUpdateTicketStatus() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateStatus = async (id: string, status: string) => {
    setLoading(true);
    setError(null);
    try {
      const ticketRef = ref(database, `crm_tickets/${id}`);
      await update(ticketRef, { status, lastUpdate: new Date().toISOString() });
      setLoading(false);
      return true;
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Failed to update status');
      setLoading(false);
      return false;
    }
  };

  return { updateStatus, loading, error };
}
