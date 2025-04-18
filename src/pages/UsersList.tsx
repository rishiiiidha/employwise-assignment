
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import UserCard from "@/components/UserCard";
import Pagination from "@/components/Pagination";
import EditUserDialog from "@/components/EditUserDialog";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardTopbar from "@/components/DashboardTopbar";
import { getUsers, updateUser, deleteUser, User, UserUpdatePayload } from "@/services/api";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

const UsersList: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    fetchUsers(currentPage);
  }, [isAuthenticated, navigate, currentPage]);

  // Simulate loading progress
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          const newValue = prev + Math.random() * 15;
          return newValue >= 100 ? 100 : newValue;
        });
      }, 300);

      return () => {
        clearInterval(interval);
        setLoadingProgress(0);
      };
    }
  }, [loading]);

  const fetchUsers = async (page: number) => {
    try {
      setLoading(true);
      setLoadingProgress(0);
      const data = await getUsers(page);
      setUsers(data.data);
      setTotalPages(data.total_pages);
      setError(null);
    } catch (err) {
      setError("Failed to fetch users. Please try again.");
      toast.error("Failed to fetch users");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 800); // Add a slight delay for smoother experience
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setUserToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleUpdateUser = async (id: number, userData: UserUpdatePayload) => {
    try {
      setActionLoading(true);
      await updateUser(id, userData);
      
      // Update user in local state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id
            ? { ...user, ...userData }
            : user
        )
      );
      
      setIsEditDialogOpen(false);
      toast.success("User updated successfully", {
        icon: <Sparkles className="h-4 w-4 text-violet-500" />
      });
    } catch (error) {
      toast.error("Failed to update user");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    
    try {
      setActionLoading(true);
      await deleteUser(userToDelete);
      
      // Remove user from local state
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userToDelete));
      
      setIsDeleteDialogOpen(false);
      toast.success("User deleted successfully", {
        icon: <Sparkles className="h-4 w-4 text-violet-500" />
      });
    } catch (error) {
      toast.error("Failed to delete user");
    } finally {
      setActionLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;
    
    const query = searchQuery.toLowerCase();
    return users.filter((user) => 
      user.first_name.toLowerCase().includes(query) || 
      user.last_name.toLowerCase().includes(query) || 
      user.email.toLowerCase().includes(query)
    );
  }, [users, searchQuery]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col ml-20 lg:ml-64 transition-all duration-300">
        <DashboardTopbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        
        <main className="flex-1 p-6 mt-16 lg:mt-20 overflow-y-auto">
          <div className="max-w-7xl mx-auto animate-fade-in">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <h1 className="text-2xl font-bold mb-2 sm:mb-0 text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-500">Users</h1>
              <div className="text-sm text-muted-foreground">
                {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''} found
              </div>
            </div>
            
            {loading ? (
              <div className="space-y-6">
                <Progress value={loadingProgress} className="h-2 w-full bg-gray-200 dark:bg-gray-800" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                      <div className="h-1.5 bg-gray-200 dark:bg-gray-700"></div>
                      <div className="p-6">
                        <div className="flex items-center space-x-4">
                          <Skeleton className="h-16 w-16 rounded-full" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <div className="flex items-center space-x-2 pt-1">
                              <Skeleton className="h-5 w-16 rounded-full" />
                              <Skeleton className="h-5 w-16 rounded-full" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50">
                        <div className="flex justify-end space-x-2">
                          <Skeleton className="h-8 w-8 rounded-lg" />
                          <Skeleton className="h-8 w-8 rounded-lg" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-destructive">{error}</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredUsers.map((user) => (
                    <UserCard
                      key={user.id}
                      user={user}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
                
                {filteredUsers.length === 0 && searchQuery && (
                  <div className="text-center py-12">
                    <p>No users found matching your search.</p>
                  </div>
                )}

                {!searchQuery && (
                  <div className="mt-8 flex justify-center">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      <EditUserDialog
        user={selectedUser}
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleUpdateUser}
        isLoading={actionLoading}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="border-violet-200 dark:border-violet-800">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user
              from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={actionLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              disabled={actionLoading}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
            >
              {actionLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UsersList;
