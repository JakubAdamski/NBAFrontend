import React, { useState, useEffect } from 'react';

const GamesDisplay = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('http://localhost:8080/games');
        const data = await response.json();
        setGames(data); // Zakładając, że odpowiedź API zawiera pole 'response' z grami
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="games-container">
      {games.map((game) => (
        <div key={game.id} className="game-card">
          <div className="game-time">{game.gameDate}</div>
          <div className="team">
            <img src={game.visitorTeamLogoUrl} alt={game.homeTeamName} />
            <span>{game.visitorTeamPoints}</span>
            <img src={game.homeTeamLogoUrl} alt={game.visitorTeamName} />
            <span>{game.homeTeamPoints}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GamesDisplay;
