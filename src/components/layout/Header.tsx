import React, { useEffect, useState } from 'react';
import { Bell, Menu, User } from 'lucide-react';
import { database } from '../../firebase/firebase';
import { ref, get } from 'firebase/database';
import { useUser } from '../../pages/user';

interface HeaderProps {
  onMenuButtonClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuButtonClick }) => {
  const { user } = useUser();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!user?.id) {
        setRole('Unknown');
        setLoading(false);
        return;
      }

      try {
        const userRef = ref(database, `crm_table/${user.id}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setFirstName(userData.firstName || 'No First Name');
          setLastName(userData.lastName || 'No Last Name');
          setRole(userData.role || 'No Role');
        } else {
          setFirstName('Unknown');
          setLastName('User');
          setRole('Unknown');
        }
      } catch {
        setFirstName('Error');
        setLastName('User');
        setRole('Error');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [user]);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Left side - Mobile Menu Button */}
        <div className="flex items-center">
          <button
            onClick={onMenuButtonClick}
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Right side - Notifications & User */}
        <div className="flex items-center space-x-4">
          <button
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 relative"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          <div className="border-l border-gray-300 h-6 mx-2 hidden sm:block"></div>

          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              <User size={16} className="text-gray-500" />
            </div>
            <div className="ml-2 hidden sm:block">
              {loading ? (
                <>
                  <p className="text-sm font-medium text-gray-700">Loading...</p>
                  <p className="text-xs text-gray-500">Loading...</p>
                </>
              ) : (
                <>
                  <p className="text-sm font-medium text-gray-700">
                    {firstName} {lastName}
                  </p>
                  <p className="text-xs text-gray-500">{role}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
