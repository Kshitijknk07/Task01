const User = require("../models/User");
const History = require("../models/History");

// Create initial users
const createInitialUsers = async (req, res) => {
  // Predefined list of 10 users for seeding
  const names = [
    "Rahul",
    "Kamal",
    "Sanak",
    "Pooja",
    "Neha",
    "Vikas",
    "Aman",
    "Kiran",
    "Alok",
    "Reema",
  ];

  // Check if users already exist to prevent duplicate seeding
  const existing = await User.find();
  if (existing.length > 0)
    return res.status(400).json({ message: "Users already exist" });

  const users = names.map((name) => ({ name }));
  await User.insertMany(users);
  res.json({ message: "Initial users created" });
};

const addUser = async (req, res) => {
  const { name } = req.body;
  const newUser = await User.create({ name });
  res.json(newUser);
};

const getUsers = async (req, res) => {
  // Get all users sorted by total points (descending)
  const users = await User.find().sort({ totalPoints: -1 });
  res.json(users);
};

const claimPoints = async (req, res) => {
  const { userId } = req.params;
  // Generate random points between 1-10
  const points = Math.floor(Math.random() * 10) + 1;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  // Update user's total points
  user.totalPoints += points;
  await user.save();

  // Create history record for this claim
  await History.create({
    userId: user._id,
    userName: user.name,
    points,
  });

  res.json({ message: "Points claimed", points });
};

module.exports = {
  createInitialUsers,
  addUser,
  getUsers,
  claimPoints,
};
