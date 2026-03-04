const generateAnalytics = (stats) => {
  const total = stats.find(s => s.difficulty === "All")?.count || 0;
  const easy = stats.find(s => s.difficulty === "Easy")?.count || 0;
  const medium = stats.find(s => s.difficulty === "Medium")?.count || 0;
  const hard = stats.find(s => s.difficulty === "Hard")?.count || 0;

  const hardRatio = total > 0 ? ((hard / total) * 100).toFixed(2) : 0;
  const easyRatio = total > 0 ? easy / total : 0;

  let level = "Beginner";
  if (total > 150) level = "Intermediate";
  if (total > 400) level = "Advanced";
  if (total > 800) level = "Elite";

  let feedback = "";

  if (total < 100) {
    feedback += "You're at an early stage. Focus on building strong fundamentals with Easy and Medium problems. ";
  }

  if (easyRatio > 0.6) {
    feedback += "Try increasing your Medium and Hard problem practice. ";
  }

  if (hardRatio < 10 && total > 50) {
    feedback += "Consider solving more Hard problems to improve problem-solving depth. ";
  }

  if (hardRatio > 20) {
    feedback += "Great balance! You are attempting a healthy number of Hard problems. ";
  }

  if (total > 500) {
    feedback += "Excellent consistency! Consider focusing on contests to improve ranking. ";
  }

  if (feedback === "") {
    feedback = "You're progressing well. Maintain consistency and gradually increase difficulty level.";
  }

  return {
    total,
    easy,
    medium,
    hard,
    hardRatio,
    level,
    feedback
  };
};

module.exports = { generateAnalytics };

