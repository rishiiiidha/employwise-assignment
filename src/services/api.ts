
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UserData {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

export interface UserUpdatePayload {
  first_name?: string;
  last_name?: string;
  email?: string;
}

const BASE_URL = "https://reqres.in/api";

// Get users with pagination
export const getUsers = async (page = 1): Promise<UserData> => {
  try {
    const response = await fetch(`${BASE_URL}/users?page=${page}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Update a user
export const updateUser = async (id: number, userData: UserUpdatePayload): Promise<User> => {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error("Failed to update user");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Delete a user
export const deleteUser = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "DELETE",
    });
    
    if (!response.ok) {
      throw new Error("Failed to delete user");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Get a single user
export const getUser = async (id: number): Promise<{ data: User }> => {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
