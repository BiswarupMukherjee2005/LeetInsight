import { useState } from "react";
import axios from "axios";

function ComparePage() {

  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");
  const [data, setData] = useState(null);

  const compareUsers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/compare/${user1}/${user2}`
      );

      setData(res.data);

    } catch (error) {
      console.error(error);
      alert("Comparison failed");
    }
  };

  return (
    <div>

      <h2>Compare LeetCode Users</h2>

      <input
        placeholder="First Username"
        value={user1}
        onChange={(e) => setUser1(e.target.value)}
      />

      <input
        placeholder="Second Username"
        value={user2}
        onChange={(e) => setUser2(e.target.value)}
      />

      <button onClick={compareUsers}>Compare</button>

      {data && (
        <div>

          <h3>Stronger: {data.stronger}</h3>
          <p>Difference: {data.difference}</p>

          <h4>{data.user1.username}</h4>
          <p>Total: {data.user1.total}</p>
          <p>Easy: {data.user1.easy}</p>
          <p>Medium: {data.user1.medium}</p>
          <p>Hard: {data.user1.hard}</p>

          <h4>{data.user2.username}</h4>
          <p>Total: {data.user2.total}</p>
          <p>Easy: {data.user2.easy}</p>
          <p>Medium: {data.user2.medium}</p>
          <p>Hard: {data.user2.hard}</p>

          <p>{data.comparisonFeedback}</p>

        </div>
      )}

    </div>
  );
}

export default ComparePage;