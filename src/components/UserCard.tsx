
import React from "react";
import { User } from "@/services/api";
import { Edit, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 relative group animate-scale-in">
      <div className="h-1.5 bg-gradient-to-r from-violet-500 to-cyan-400"></div>
      
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16 border-2 border-violet-100 dark:border-violet-900 transition-all duration-300 group-hover:border-violet-300 dark:group-hover:border-violet-700">
            <AvatarImage src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
            <AvatarFallback className="bg-gradient-to-br from-violet-500 to-cyan-500 text-white">
              {getInitials(user.first_name, user.last_name)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
              {user.first_name} {user.last_name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
            <div className="flex items-center mt-1">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-50 dark:bg-violet-900 text-violet-700 dark:text-violet-200">
                User
              </span>
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-50 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-200">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 flex justify-end space-x-2 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => onEdit(user)}
          className="p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-violet-500 hover:text-white dark:hover:bg-violet-600 dark:hover:text-white transition-colors"
          aria-label="Edit user"
        >
          <Edit className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(user.id)}
          className="p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-500 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition-colors"
          aria-label="Delete user"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default UserCard;
