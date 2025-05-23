import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import Sidebar from './Sidebar';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  // Close sidebar when clicking escape
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  // Prevent scroll on body when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex md:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none">
        <div className="absolute top-0 right-0 -mr-12 pt-2">
          <button
            onClick={onClose}
            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span className="sr-only">Close sidebar</span>
            <X size={20} className="text-white" />
          </button>
        </div>
        
        {/* Sidebar content */}
        <Sidebar />
      </div>

      {/* Force focus */}
      <div className="flex-shrink-0 w-14" aria-hidden="true">
        {/* Force sidebar to shrink to fit close icon */}
      </div>
    </div>
  );
};

export default MobileSidebar;