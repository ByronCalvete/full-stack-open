import { useState } from 'react'

const Button = ({ name, click }) => {
  return (
    <button onClick={click}>{name}</button>
  )
}

const StatisticLine = ({ text, value, units = '' }) => {
  return (
    <p>{text} {value} {units}</p>
  )
}

const Statistics = ({ good, neutral, bad, total }) => {
  return (
    <>
      <h1>Statistics</h1>
      <StatisticLine text='good' value={good}/>
      <StatisticLine text='neutral' value={neutral}/>
      <StatisticLine text='bad' value={bad}/>
      <StatisticLine text='total' value={total}/>
      <StatisticLine text='average' value={total && (good - bad)/100}/>
      <StatisticLine text='positive' value={total && (good/total)*100} units='%'/>
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

  const total = good + neutral + bad

  return (
    <>
      <h1>Give feedback</h1>
      <Button name='good' click={handleGoodClick}/>
      <Button name='neutral' click={handleNeutralClick}/>
      <Button name='bad'click={handleBadClick}/>
      {
        total 
          ? <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
          : <p>No feedback given.. 😥</p>
      }
    </>
  )
}

export default App
