import { useState } from 'react'

const Button = ({ name, click }) => {
  return (
    <button onClick={click}>{name}</button>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad

  return (
    <>
      <h1>Statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>total {total}</p>
      <p>average {total && (good - bad)/total}</p>
      <p>postive {total && (good/total)*100}%</p>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <>
      <h1>Give feedback</h1>
      <Button name='good' click={handleGoodClick}/>
      <Button name='neutral' click={handleNeutralClick}/>
      <Button name='bad'click={handleBadClick}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App
