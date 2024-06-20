import React from 'react'
import Quiz from "../img/quiz.svg";
import './Welcome.css';
import { QuizContext } from '../context/quiz';
import { useContext } from 'react';

const Welcome = () => {

    const [quizState, dispatch] = useContext(QuizContext)
    // quizState pegará os valores e dispatch alterará os valores
    console.log(quizState)

  return (
    <div id='welcome'>
    <h1>Welcome</h1>
    <p>Click on the button to start:</p>
    <button onClick={() => dispatch({type: "CHANGE_STATE"})}>Iniciar</button>
    <img src={Quiz} alt="Início do Quiz" />
    </div>
  )
}

export default Welcome