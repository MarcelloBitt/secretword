import "./GameOver.css";

const GameOver = ({ retry, score }) => {
  return (
    <div>
      <h1>Game over</h1>
      <h2>
        Sua pontuação foi <span>{score}</span>
      </h2>
      <button onClick={retry}>Reinicar jogo</button>
    </div>
  );
};

export default GameOver;
