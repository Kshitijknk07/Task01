const History = require("../models/History");

const getHistory = async (req, res) => {
  // Get all claim history sorted by most recent first
  const history = await History.find().sort({ claimedAt: -1 });
  res.json(history);
};

module.exports = { getHistory };
