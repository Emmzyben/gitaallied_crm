import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';

type NotificationType = 'success' | 'error';

interface Notification {
  type: NotificationType;
  message: string;
}

interface NotificationContextProps {
  showNotification: (notification: Notification) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const useNotification = (): NotificationContextProps => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<Notification | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const showNotification = (notif: Notification) => {
    setNotification(notif);
    setIsOpen(true);
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsOpen(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}

      <div
        className={clsx(
          'fixed top-5 right-5 z-50 transition-transform duration-500 ease-in-out transform',
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0',
          'w-80 p-4 rounded-lg shadow-lg text-white flex justify-between items-start space-x-2',
          {
            'bg-green-600': notification?.type === 'success',
            'bg-red-600': notification?.type === 'error',
          }
        )}
      >
        <div className="text-sm">{notification?.message}</div>
        <button onClick={() => setIsOpen(false)} className="ml-auto">
          <X className="w-4 h-4" />
        </button>
      </div>
    </NotificationContext.Provider>
  );
};
