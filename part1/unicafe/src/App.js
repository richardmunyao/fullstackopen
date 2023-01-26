import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  //defining our button handlers
  const goodButtonHandler = () => {
    setGood(good + 1)
  }

  const neutralButtonHandler = () => {
    setNeutral (neutral + 1)    

  }

  const badButtonHandler = () => {
    setBad(bad + 1)
  }

  

  return (
    <div>
      <Header />
      <p></p>
      <Button clickHandler={goodButtonHandler} text="good" />
      <Button clickHandler={neutralButtonHandler} text="neutral" />
      <Button clickHandler={badButtonHandler} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

//Header component
const Header = () => {
  return(
    <div>
      <h1>Give Feedback</h1>
    </div>
  )
}

//Button Component
const Button = ({clickHandler, text}) => {
  return (
    <button onClick={clickHandler}>{text}</button>
  )
}

//Statistics Component
const Statistics = ({good, neutral, bad}) => {  
  let total = good + neutral + bad
  if (total === 0){
    return(
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  
  return(
    <div>
      <h1>Statistics</h1>
      <p></p>
      <table>
      <tbody>
        <tr>          
          <td>Good</td>
          <td>{good}</td>
        </tr>
        <tr>
          <td>Neutral</td>
          <td>{neutral}</td>
        </tr>
        <tr>
          <td>Bad</td>
          <td>{bad}</td>
        </tr>
        <tr>
          <td>All</td>
          <td>{total}</td>
        </tr>
        <tr>
          <td>Average</td>
          <td>{(good-bad)/total}</td>
        </tr>
        <tr>
          <td>Positive</td>
          <td>{(good/total)*100} %</td>
        </tr>
        </tbody>
      </table>
      
    </div>
  )
}


export default App;
