const { getLeetCodeStats } = require("../services/leetcodeService");
const { generateAnalytics } = require("../utils/analytics");

const getUserStats = async (req, res) => {
  try {
    const { username } = req.params;

    const userData = await getLeetCodeStats(username);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const stats = userData.submitStatsGlobal.acSubmissionNum;
    const ranking = userData.profile?.ranking || 0;

    const analytics = generateAnalytics(stats);

    res.json({
      username: userData.username,
      totalSolved: analytics.total,
      easy: analytics.easy,
      medium: analytics.medium,
      hard: analytics.hard,
      ranking,
      hardRatio: analytics.hardRatio,
      level: analytics.level,
      feedback: analytics.feedback
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = { getUserStats };