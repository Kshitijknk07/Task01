import { useState } from "react";
import type { User } from "../types";
import { api } from "../services/api";

interface UserSelectionProps {
  users: User[];
  selectedUserId: string;
  onUserSelect: (userId: string) => void;
  onUserAdded: () => void;
}

export const UserSelection = ({
  users,
  selectedUserId,
  onUserSelect,
  onUserAdded,
}: UserSelectionProps) => {
  const [newUserName, setNewUserName] = useState("");
  const [isAddingUser, setIsAddingUser] = useState(false);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim()) return;

    setIsAddingUser(true);
    try {
      await api.addUser(newUserName.trim());
      setNewUserName("");
      onUserAdded();
    } catch (error) {
      console.error("Failed to add user:", error);
      alert("Failed to add user. Please try again.");
    } finally {
      setIsAddingUser(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-6 border border-gray-100">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
          <span className="text-blue-600 text-xl">👥</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">User Selection</h2>
      </div>

      {/* User Dropdown */}
      <div className="mb-6">
        <label
          htmlFor="user-select"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Select a User
        </label>
        <select
          id="user-select"
          value={selectedUserId}
          onChange={(e) => onUserSelect(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
        >
          <option value="">Choose a user...</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name} ({user.totalPoints} points)
            </option>
          ))}
        </select>
      </div>

      {/* Add New User Form */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span className="text-green-600 mr-2">➕</span>
          Add New User
        </h3>
        <form onSubmit={handleAddUser} className="flex gap-3">
          <input
            type="text"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            placeholder="Enter user name..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
            disabled={isAddingUser}
          />
          <button
            type="submit"
            disabled={!newUserName.trim() || isAddingUser}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold"
          >
            {isAddingUser ? "Adding..." : "Add User"}
          </button>
        </form>
      </div>
    </div>
  );
};
