import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)  
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  console.log("selected:",selected)
  
  const nextButtonHandler = () => {
    const random = Math.floor(Math.random()*8)
    setSelected(random)
  }

  const voteButtonHandler = () => {
    const newVotes = [...points]
    newVotes[selected] += 1
    setPoints(newVotes)   
  }
  

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p></p>
      <p>Has {points[selected]} votes</p>
      <button onClick={nextButtonHandler}>Next Anecdote</button>
      <button onClick={voteButtonHandler}>Vote</button>
      <MostVotes points={points} anecdotes={anecdotes}/>
    </div>
  )
}

const MostVotes = ({points, anecdotes}) => {
  
  const maxPoints = Math.max(...points)
  //index of highest vote:
  const highestIndex = points.indexOf(Math.max(...points))


  return(
    <div>
      <h1>Anecdote with most votes</h1>
      <p> {anecdotes[highestIndex]}</p>
      <p>Has {maxPoints} votes</p>
    </div>
  )

}

export default App