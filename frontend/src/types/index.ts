export interface User {
  _id: string;
  name: string;
  totalPoints: number;
}

export interface History {
  _id: string;
  userId: string;
  userName: string;
  points: number;
  claimedAt: string;
}

export interface ClaimResponse {
  message: string;
  points: number;
}
