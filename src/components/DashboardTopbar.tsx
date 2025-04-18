
import React from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import SearchBar from '@/components/SearchBar';

interface DashboardTopbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const DashboardTopbar: React.FC<DashboardTopbarProps> = ({ searchQuery, onSearchChange }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="h-16 lg:h-20 fixed right-0 top-0 left-20 lg:left-64 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 z-40 transition-all duration-300 ease-in-out">
      <div className="h-full px-4 lg:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <Sparkles className="h-5 w-5 text-violet-500 mr-2 animate-pulse" />
          <h2 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-500">User Management</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <SearchBar value={searchQuery} onChange={onSearchChange} />
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300 hover:bg-violet-100 dark:hover:bg-violet-800/50 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardTopbar;
