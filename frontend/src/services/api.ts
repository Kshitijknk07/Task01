import type { User, History, ClaimResponse } from "../types";

// Backend API base URL - use environment variable in production
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const api = {
  // Get all users
  getUsers: async (): Promise<User[]> => {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return response.json();
  },

  // Add a new user
  addUser: async (name: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      throw new Error("Failed to add user");
    }
    return response.json();
  },

  // Seed initial users
  seedUsers: async (): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/users/seed`);
    if (!response.ok) {
      throw new Error("Failed to seed users");
    }
    return response.json();
  },

  // Claim points for a user
  claimPoints: async (userId: string): Promise<ClaimResponse> => {
    const response = await fetch(`${API_BASE_URL}/users/claim/${userId}`, {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error("Failed to claim points");
    }
    return response.json();
  },

  // Get claim history
  getHistory: async (): Promise<History[]> => {
    const response = await fetch(`${API_BASE_URL}/history`);
    if (!response.ok) {
      throw new Error("Failed to fetch history");
    }
    return response.json();
  },
};
