import type { History } from "../types";

interface HistoryProps {
  history: History[];
}

export const HistoryComponent = ({ history }: HistoryProps) => {
  // Format timestamp to readable date string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
          <span className="text-white text-xl">📜</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Claim History</h2>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No claim history yet. Start claiming points to see history!</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {history.map((entry) => (
            <div
              key={entry._id}
              className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 border border-blue-200 hover:border-blue-300"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">
                    +{entry.points}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {entry.userName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {formatDate(entry.claimedAt)}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg font-bold text-green-600">
                  +{entry.points}
                </div>
                <div className="text-xs text-gray-500">points claimed</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
