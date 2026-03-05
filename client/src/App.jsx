import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import ComparePage from "./pages/ComparePage";

function App() {
  return (
    <Router>

      <div style={{ padding: "20px" }}>

        <h1>LeetInsight</h1>

        {/* Navigation */}
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/" style={{ marginRight: "20px" }}>Dashboard</Link>
          <Link to="/compare">Compare Users</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/compare" element={<ComparePage />} />
        </Routes>

      </div>

    </Router>
  );
}

export default App;