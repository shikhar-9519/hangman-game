
type HangmanwordProps = {
  wordToGuess: string,
  guessedLetters: string[],
  reveal: boolean
}

export default function Hangmanword({wordToGuess, guessedLetters, reveal}: HangmanwordProps) {
  return (
    <div className='hgw-container'>
      {wordToGuess.split("").map((letter,index)=>(
        <span className='border-bottom-black' key={index}>
          <span style={{visibility: guessedLetters.includes(letter) || reveal ? 'visible' : 'hidden', color:
                !guessedLetters.includes(letter) && reveal ? "red" : "black",}}>
            {letter}
          </span>
        </span>
      ))}
    </div>
  )
}
