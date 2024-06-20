import { createContext, useReducer } from "react";
import questions from "../data/questions.js";
// createContext serve para criar um contexto. Um contexto é um objeto que permite compartilhar valores entre componentes sem a necessidade de passar props manualmente em cada nível da árvore de componentes. O valor passado para createContext é o valor padrão do contexto.
// useReducer é um hook que serve para gerenciar estados complexos. Ele é uma alternativa ao useState e é usado quando o estado de um componente depende do estado anterior ou de outros estados. Ele recebe dois argumentos: um reducer e um estado inicial. O reducer é uma função que recebe o estado atual e uma ação e retorna um novo estado. O estado inicial é o estado inicial do componente. useReducer retorna um array com dois elementos: o estado atual e uma função que dispara ações para alterar o estado.
// Ele vai servir para gerenciar estados 

const STAGES = ["Start", "Playing", "End"]

const initialState = {
    gameStage: STAGES[0],
    // trata do estado do jogo
    questions,
    // trata das perguntas
    currentQuestion: 0,
    score: 0,
    answerSelected: false,
}

const quizReducer = (state, action) => {
    console.log(state, action)
    // state é o estado atual do componente e action é a ação que vai ser executada. 
    // O reducer é uma função que recebe o estado atual e uma ação e retorna um novo estado. 
    // O reducer é responsável por atualizar o estado do componente.
    // temos um switch case que vai tratar as ações
    switch (action.type) {
        case "CHANGE_STATE":
            return {
                ...state,
                gameStage: STAGES[1],
                currentQuestion: 0,
            }
        case "REORDER_QUESTIONS":
            const reorderQuestions = questions.sort(()=> {
                return Math.random() - 0.5;
            })
            return {
                ...state,
                 questions: reorderQuestions,
            };
        
        case "CHANGE_QUESTION":
            const nextQuestion = state.currentQuestion + 1;
            let endGame = false;
            if (!questions[nextQuestion]) {
                endGame = true;
            }

            return {
                ...state,
                currentQuestion: nextQuestion,
                gameStage: endGame ? STAGES[2] : state.gameStage,
                answerSelected: false,
            };
        case "NEW_GAME":
            return initialState;
        case "CHECK_ANSWER":
            if (state.answerSelected) return state;
            const answer = action.payload.answer
            const option = action.payload.option
            let correctAnswer = 0;
            if (answer === option) correctAnswer = 1;

            return {
                ...state,
                score: state.score + correctAnswer,
                answerSelected: option,
            }
        default:
            return state;
    }
}
export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const value = useReducer(quizReducer, initialState);
    // Isso se tornará o estado global do aplicativo, que será compartilhado entre todos os componentes.

    return <QuizContext.Provider value = {value}>{children}</QuizContext.Provider>
};