import { useState, useEffect } from "react";
import { UserSelection } from "./components/UserSelection";
import { ClaimButton } from "./components/ClaimButton";
import { Leaderboard } from "./components/Leaderboard";
import { HistoryComponent } from "./components/History";
import type { User, History } from "./types";
import { api } from "./services/api";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [history, setHistory] = useState<History[]>([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial data from both users and history endpoints
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch users and history data concurrently
      const [usersData, historyData] = await Promise.all([
        api.getUsers(),
        api.getHistory(),
      ]);

      setUsers(usersData);
      setHistory(historyData);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setError(
        "Failed to load data. Please check if the backend server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // Seed initial users if no users exist
  const handleSeedUsers = async () => {
    try {
      await api.seedUsers();
      await fetchData();
    } catch (err) {
      console.error("Failed to seed users:", err);
      alert("Failed to seed users. They may already exist.");
    }
  };

  // Refresh data after points are claimed
  const handlePointsClaimed = async () => {
    // Refresh both users and history data to show updated rankings
    await fetchData();
  };

  // Refresh users list after adding a new user
  const handleUserAdded = async () => {
    try {
      const usersData = await api.getUsers();
      setUsers(usersData);
    } catch (err) {
      console.error("Failed to refresh users:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Connection Error
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-6 shadow-lg">
            <span className="text-4xl">🏆</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Leaderboard App
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Select a user, claim points, and watch the leaderboard update in
            real-time!
          </p>
        </div>

        {/* Seed Users Button (if no users exist) */}
        {users.length === 0 && (
          <div className="text-center mb-8">
            <button
              onClick={handleSeedUsers}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              🌱 Seed Initial Users
            </button>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <UserSelection
              users={users}
              selectedUserId={selectedUserId}
              onUserSelect={setSelectedUserId}
              onUserAdded={handleUserAdded}
            />

            <ClaimButton
              selectedUserId={selectedUserId}
              onPointsClaimed={handlePointsClaimed}
            />

            <HistoryComponent history={history} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Leaderboard users={users} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
