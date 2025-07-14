import { useState, useEffect } from 'react';
import { database } from '../firebase/firebase';
import { ref, onValue } from 'firebase/database';

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

export function useFetchAllCallLogs() {
  const [callLogs, setCallLogs] = useState<CallLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
            }));

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
  }, []);

  return { callLogs, loading, error };
}
