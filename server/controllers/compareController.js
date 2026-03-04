const { getLeetCodeStats } = require("../services/leetcodeService"); 
const { generateAnalytics } = require("../utils/analytics");


const compareUsers = async (req, res) => {
  try {
    const { user1, user2 } = req.params;

    const userData2 = await getLeetCodeStats(user2);
    const userData1 = await getLeetCodeStats(user1);

    const stats1 = userData1.submitStatsGlobal.acSubmissionNum;
    const stats2 = userData2.submitStatsGlobal.acSubmissionNum;

    const analytics1 = generateAnalytics(stats1);
    const analytics2 = generateAnalytics(stats2);

    // 🔥 Smarter Stronger Logic
    let stronger = "Tie";

    if (analytics1.total > analytics2.total) {
      stronger = user1;
    } else if (analytics2.total > analytics1.total) {
      stronger = user2;
    }

    // If totals are close (<20 difference), compare hard ratio
    if (Math.abs(analytics1.total - analytics2.total) < 20) {
      if (analytics1.hardRatio > analytics2.hardRatio) {
        stronger = `${user1} (Stronger in Hard Problems)`;
      } else if (analytics2.hardRatio > analytics1.hardRatio) {
        stronger = `${user2} (Stronger in Hard Problems)`;
      }
    }

    // 🔥 Comparative Feedback
    let comparisonFeedback = "";

    if (analytics1.total > analytics2.total) {
      comparisonFeedback = `${user2} needs ${
        analytics1.total - analytics2.total
      } more problems to catch up.`;
    } else if (analytics2.total > analytics1.total) {
      comparisonFeedback = `${user1} needs ${
        analytics2.total - analytics1.total
      } more problems to catch up.`;
    } else {
      comparisonFeedback =
        "Both users are at similar levels. Healthy competition!";
    }

    res.json({
      user1: {
        username: user1,
        ...analytics1
      },
      user2: {
        username: user2,
        ...analytics2
      },
      stronger,
      difference: Math.abs(analytics1.total - analytics2.total),
      comparisonFeedback
    });

  } catch (error) {
    console.error("COMPARE ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = { compareUsers };