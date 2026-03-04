const axios = require("axios");

const getLeetCodeStats = async (username) => {
  const query = {
    query: `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username
          submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
          profile {
            ranking
          }
        }
      }
    `,
    variables: { username }
  };

  const response = await axios.post(
    "https://leetcode.com/graphql",
    query,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  const user = response.data?.data?.matchedUser;

  if (!user) {
    throw new Error("User not found on LeetCode");
  }

  const stats = user.submitStatsGlobal?.acSubmissionNum;

  if (!Array.isArray(stats)) {
    throw new Error("LeetCode stats unavailable");
  }

  return user;
};

module.exports = { getLeetCodeStats };