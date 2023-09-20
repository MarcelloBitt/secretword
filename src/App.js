import "./App.css";
import { useCallback, useEffect, useState } from "react";

import { wordsList } from "./data/data";

import StartSceen from "./components/StartSceen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  return (
    <div className="App">
      {gameStage === "start" && <StartSceen />}
      {gameStage === "game" && <Game />}
      {gameStage === "end" && <GameOver />}
    </div>
  );
}

export default App;
