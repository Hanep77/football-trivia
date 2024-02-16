import axios from 'axios'
import { useState } from 'react'

function App() {
  const [questions, setQuestions] = useState(null)

  function handleStartQuiz(e) {
    axios.get('https://the-trivia-api.com/v2/questions?tags=soccer').then(response => {
      setQuestions(response.data)
      e.target.className = "hidden"
    })
  }

  return (
    <div className='max-w-screen-md min-h-screen bg-slate-800 m-auto px-5 py-8'>
      <div className='flex justify-center'>
        <button onClick={handleStartQuiz} className='bg-green-600 hover:bg-green-700 active:bg-green-800 px-4 py-1 rounded'>start quiz</button>
      </div>

      <div className='flex flex-col gap-8'>
        {questions?.map(question => <Quiz key={question.id} question={question} />)}
      </div >
    </div >
  )
}

function Quiz({ question }) {
  const [correctness, setCorrectness] = useState(false)
  const answer = [...question.incorrectAnswers, question.correctAnswer].sort((a, b) => 0.5 - Math.random())

  function handleCheckAnswer(e) {
    setCorrectness(e.target.innerText == question.correctAnswer)
  }

  return (
    <div className={`border border-slate-600 ${correctness && 'bg-green-700'} rounded p-4`}>
      <h1 className='text-xl'>{question.question.text}</h1>
      <div className={`grid grid-cols-2 gap-2 mt-3 ${correctness && 'hidden'}`} >
        {
          answer.map(a => {
            return <button key={a} onClick={handleCheckAnswer} className='bg-slate-600 hover:bg-slate-700 p-2 rounded'>{a}</button>
          })
        }
      </div>
      <h2 className={`${!correctness && 'hidden'} text-lg`}>The answer : {question.correctAnswer}</h2>
    </div>
  )
}

export default App
