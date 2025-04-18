
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Users, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const DashboardSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { icon: Users, label: "Users", path: "/users" },
  ];

  return (
    <aside className="h-screen w-20 lg:w-64 fixed left-0 top-0 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 transition-all duration-300 ease-in-out flex flex-col z-50">
      <div className="flex items-center justify-center h-16 lg:h-20 border-b border-gray-100 dark:border-gray-800">
        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-500 hidden lg:block">EmployWise</h1>
        <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-500 lg:hidden">EW</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => navigate(item.path)}
                className={`flex items-center w-full p-3 rounded-lg transition-all duration-300 ${
                  isActive(item.path)
                    ? "bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300 scale-105"
                    : "text-gray-600 dark:text-gray-400 hover:bg-violet-50/50 dark:hover:bg-violet-900/20 hover:text-violet-600 dark:hover:text-violet-300"
                }`}
              >
                <item.icon className={`h-5 w-5 flex-shrink-0 transition-all duration-300 ${isActive(item.path) ? "animate-pulse" : ""}`} />
                <span className={`ml-4 hidden lg:block transition-all duration-300 ${isActive(item.path) ? "font-medium" : ""}`}>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-100 dark:border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center w-full p-3 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-300 transition-all duration-300"
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          <span className="ml-4 hidden lg:block">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
