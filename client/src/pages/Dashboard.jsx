import { useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchUser = async () => {
    try {
      setError("");
      const res = await axios.get(
        `http://localhost:5000/api/user/${username}`
      );
      setData(res.data);
    } catch (err) {
      setError("User not found");
      setData(null);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>LeetInsight Dashboard</h1>

      <input
        type="text"
        placeholder="Enter LeetCode Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: "10px", marginRight: "10px" }}
      />

      <button onClick={fetchUser} style={{ padding: "10px" }}>
        Search
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && (
        <div style={{ marginTop: "30px" }}>
          <h2>Stats for {data.username}</h2>
          <p>Total Solved: {data.total}</p>
          <p>Easy: {data.easy}</p>
          <p>Medium: {data.medium}</p>
          <p>Hard: {data.hard}</p>
          <p>Hard Ratio: {data.hardRatio}%</p>
          <p>Level: {data.level}</p>
          <p>Feedback: {data.feedback}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;