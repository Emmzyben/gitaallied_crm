import { useState, useEffect } from 'react';
import { database } from '../firebase/firebase';
import { ref, onValue } from 'firebase/database';
import { useUser } from '../pages/user';

interface CallLog {
  id: string;
  customer?: string;
  agent?: string;
  time?: string;
  duration?: string;
  callType?: string;
  status?: string;
  rating?: number;
  userId?: string;
  [key: string]: unknown;
}

export function useFetchCallLogs() {
  const [callLogs, setCallLogs] = useState<CallLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    if (!user?.id) {
      setError('User is not authenticated');
      setLoading(false);
      return;
    }

    const callLogsRef = ref(database, 'crm_calls');

    const unsubscribe = onValue(
      callLogsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const loadedCallLogs: CallLog[] = Object.entries(data)
            .map(([key, value]) => ({
              id: key,
              ...(value as object),
            }))
            .filter(callLog => (callLog as CallLog).userId === user.id); // filter by logged-in user ID

          setCallLogs(loadedCallLogs);
        } else {
          setCallLogs([]);
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

  return { callLogs, loading, error };
}
