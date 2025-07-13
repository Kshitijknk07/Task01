import { useState } from "react";
import { api } from "../services/api";

interface ClaimButtonProps {
  selectedUserId: string;
  onPointsClaimed: (points: number) => void;
}

export const ClaimButton = ({
  selectedUserId,
  onPointsClaimed,
}: ClaimButtonProps) => {
  const [isClaiming, setIsClaiming] = useState(false);
  const [lastClaimedPoints, setLastClaimedPoints] = useState<number | null>(
    null
  );

  const handleClaim = async () => {
    if (!selectedUserId) {
      alert("Please select a user first!");
      return;
    }

    setIsClaiming(true);
    try {
      const response = await api.claimPoints(selectedUserId);
      setLastClaimedPoints(response.points);
      onPointsClaimed(response.points);

      // Clear the claimed points after 3 seconds
      setTimeout(() => setLastClaimedPoints(null), 3000);
    } catch (error) {
      console.error("Failed to claim points:", error);
      alert("Failed to claim points. Please try again.");
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-6 text-center border border-gray-100">
      <div className="flex items-center justify-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mr-3 shadow-lg">
          <span className="text-white text-xl">🎯</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Claim Points</h2>
      </div>

      <button
        onClick={handleClaim}
        disabled={!selectedUserId || isClaiming}
        className="px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xl font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
      >
        {isClaiming ? "🎲 Claiming..." : "🎲 Claim Points"}
      </button>

      {lastClaimedPoints && (
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl animate-pulse">
          <p className="text-green-800 font-bold text-lg flex items-center justify-center">
            <span className="text-2xl mr-2">🎉</span>+{lastClaimedPoints} points
            claimed successfully!
          </p>
        </div>
      )}

      {!selectedUserId && (
        <p className="mt-4 text-gray-600 text-sm">
          Please select a user to claim points
        </p>
      )}
    </div>
  );
};
