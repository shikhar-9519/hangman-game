import { useCallback, useEffect, useState } from "react"
import words from "./wordList.json";
import Hangmanword from "./Components/Hangmanword";
import Keyboards from "./Components/Keyboards";
import HangmanDrawing from "./Components/HangmanDrawing";
import './style/HangmanDrawing.css';

function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function App() {
  const [guessedIndex, setGuessedIndex] = useState(getWord);
  const wordToGuess = guessedIndex.word;
  const wordHint = guessedIndex.hint;
  const[guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const incorrectGuesses = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  );

  const isLoser = incorrectGuesses.length >= 6
  const isWinner = wordToGuess
    .split("")
    .every(letter => guessedLetters.includes(letter))
  const reveal = incorrectGuesses.length >= 6

    const addGuessedLetter = useCallback(
      (letter: string) => {
        if (guessedLetters.includes(letter) || isLoser || isWinner) return
  
        setGuessedLetters(currentLetters => [...currentLetters, letter])
      },
      [guessedLetters, isWinner, isLoser]
    )

    useEffect(() => {
      const handler = (e: KeyboardEvent) => {
        const key = e.key
        if (!key.match(/^[a-z]$/)) return
  
        e.preventDefault()
        addGuessedLetter(key)
      }
  
      document.addEventListener("keypress", handler)
  
      return () => {
        document.removeEventListener("keypress", handler)
      }
    }, [guessedLetters])
  
    useEffect(() => {
      const handler = (e: KeyboardEvent) => {
        const key = e.key
        if (key !== "Enter") return
  
        e.preventDefault()
        setGuessedLetters([])
        setGuessedIndex(getWord())
      }
  
      document.addEventListener("keypress", handler)
  
      return () => {
        document.removeEventListener("keypress", handler)
      }
    }, [])

  return (
    <div className="hangman-container">
      <div className="result-message">
        {isWinner && <span className="winner-message">Winner! - Refresh to try again</span>}
        {isLoser && <span className="loser-message">Nice Try - Refresh to try again</span>}
      </div>
      <HangmanDrawing incorrectGuesses={incorrectGuesses.length}/>
      <div className="hint-style">Hint -{wordHint}</div>
      <Hangmanword wordToGuess={wordToGuess} guessedLetters={guessedLetters} reveal = {reveal}/>
      <div className="align-self-stretch">
        <Keyboards
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter(letter =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectGuesses}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  )
}

export default App
