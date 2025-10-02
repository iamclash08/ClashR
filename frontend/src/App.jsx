import { useState } from "react";
import PlayerSearch from "./components/PlayerSearch";
import PlayerProfile from "./components/Playerprofile";

function App() {
  const [playerData, setPlayerData] = useState(null);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Clash Royale Account Analyzer</h1>
      <PlayerSearch setPlayerData={setPlayerData} />
      <PlayerProfile player={playerData} />
    </div>
  );
}

export default App;
