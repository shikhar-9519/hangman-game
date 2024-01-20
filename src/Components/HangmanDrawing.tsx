import '../style/HangmanDrawing.css'

type HangmanDrawingProps = {
  incorrectGuesses: number
}
export default function HangmanDrawing({incorrectGuesses} : HangmanDrawingProps) {
  const Head = () => {
    return <div className='hgd-head'/>
  }

  const Body = () => {
    return <div className='hgd-man-body'/>
  }

  const LeftHand = () => {
    return <div className='hgd-man-left-hand'></div>
  }

  const LeftLeg = () => {
    return <div className='hgd-man-left-leg'></div>
  }
  const RightHand = () => {
    return <div className='hgd-man-right-hand'></div>
  }
  const RightLeg = () => {
    return <div className='hgd-man-right-leg'></div>
  }

  const Hangman = [Head(),Body(),LeftHand(),RightHand(),LeftLeg(),RightLeg()];

  return (
    <div className='hgd-container'>
      <div className='hgd-tip'/>
        {Hangman.splice(0,incorrectGuesses)}
      <div className='hgd-header'/>
      <div className='hgd-pole'/>
      <div className='hgd-footer'/>
    </div>
  )
}
