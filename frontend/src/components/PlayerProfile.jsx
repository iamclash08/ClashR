function PlayerProfile({ player }) {
  if (!player) return null;

  return (
    <div style={{ margin: "20px", padding: "10px", border: "1px solid #ccc" }}>
      <h3>{player.name} ({player.tag})</h3>
      <p><strong>Trophies:</strong> {player.trophies}</p>
      <p><strong>Best Trophies:</strong> {player.bestTrophies}</p>
      <p><strong>Level:</strong> {player.expLevel}</p>
      <p><strong>Clan:</strong> {player.clan ? player.clan.name : "No Clan"}</p>
    </div>
  );
}

export default PlayerProfile;
