import React from 'react'
import { useContext } from 'react'
import { QuizContext } from '../context/quiz'

import WellDone from "../img/welldone.svg"
import './GameOver.css'

const GameOver = () => {
const [quizState, dispatch] = useContext(QuizContext);

  return (
    <div id='gameover'>
        <h2>End of Game</h2>
        <p>Points: {quizState.score}</p>
        <p>You scored {quizState.score} out of {quizState.questions.length}</p>
        <img src={WellDone} alt="Quiz ending." />
        <button onClick={()=> dispatch({type: "NEW_GAME"})}>Restart</button>
        
        </div>
  )
}

export default GameOver