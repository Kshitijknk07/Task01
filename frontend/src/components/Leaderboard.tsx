import type { User } from "../types";

interface LeaderboardProps {
  users: User[];
}

export const Leaderboard = ({ users }: LeaderboardProps) => {
  // Sort users by total points in descending order for ranking
  const sortedUsers = [...users].sort((a, b) => b.totalPoints - a.totalPoints);

  // Get appropriate medal icon or rank number for display
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return `#${rank}`;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-6 border border-gray-100">
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
          <span className="text-white text-xl">🏆</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Leaderboard</h2>
      </div>

      {sortedUsers.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No users found. Add some users to get started!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedUsers.map((user, index) => {
            const rank = index + 1;
            return (
              <div
                key={user._id}
                className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-gray-100 hover:to-gray-200 transition-all duration-300 border border-gray-200 hover:border-gray-300 hover:shadow-md"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl font-bold text-gray-600 min-w-[40px]">
                    {getRankIcon(rank)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {user.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {user.totalPoints}{" "}
                      {user.totalPoints === 1 ? "point" : "points"}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">
                    {user.totalPoints}
                  </div>
                  <div className="text-xs text-gray-500">
                    {rank === 1
                      ? "Champion"
                      : rank === 2
                      ? "Runner-up"
                      : rank === 3
                      ? "Third Place"
                      : `${rank}${
                          rank === 1
                            ? "st"
                            : rank === 2
                            ? "nd"
                            : rank === 3
                            ? "rd"
                            : "th"
                        } Place`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
