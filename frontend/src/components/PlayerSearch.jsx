import { useState } from "react";
import api from "../api";

function PlayerSearch({ setPlayerData }) {
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get(`players/${tag}/`); // hitting backend
      setPlayerData(response.data);
    } catch (err) {
      setError("Could not fetch player details. Check tag or server.");
    }
    setLoading(false);
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2>Search Clash Royale Player</h2>
      <input
        type="text"
        placeholder="Enter Player Tag (e.g. 2P0LYQ9L)"
        value={tag}
        onChange={(e) => setTag(e.target.value.replace("#", ""))}
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default PlayerSearch;
