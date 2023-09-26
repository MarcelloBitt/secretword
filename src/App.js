import "./App.css";
import { useCallback, useEffect, useState } from "react";
import { wordsList } from "./data/data";
import StartScreen from "./components/StartSceen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const initialGuesses = 5;

function App() {
  // Estado do jogo
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(initialGuesses);
  const [score, setScore] = useState(0);

  // Escolhe uma palavra e categoria aleatória
  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  }, [words]);

  // Inicia o jogo
  const startGame = useCallback(() => {
    clearLetterStates();
    const { word, category } = pickWordAndCategory();
    const wordLetters = word.split("").map((l) => l.toLowerCase());
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);
    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  // Verifica a letra selecionada
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toString().toLowerCase();
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((prevGuessedLetters) => [
        ...prevGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((prevWrongLetters) => [
        ...prevWrongLetters,
        normalizedLetter,
      ]);
      setGuesses((prevGuesses) => prevGuesses - 1);
    }
  };

  // Limpa o estado das letras
  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  // Condição de derrota
  useEffect(() => {
    if (guesses <= 0) {
      clearLetterStates();
      setGameStage(stages[2].name);
    }
  }, [guesses]);

  // Condição de vitória
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    if (
      guessedLetters.length === uniqueLetters.length &&
      gameStage === stages[1].name
    ) {
      setScore((prevScore) => prevScore + 100);
      setGuesses((prevGuesses) => prevGuesses + 1);
      clearLetterStates();
      startGame();
    }
  }, [guessedLetters, letters, startGame, gameStage]);

  // Recomeça o jogo
  const retry = () => {
    setScore(0);
    setGuesses(initialGuesses);
    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && (
        <GameOver
          retry={retry}
          score={score}
        />
      )}
    </div>
  );
}

export default App;
