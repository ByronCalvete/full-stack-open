import { useState } from 'react'

import Button from './components/Button'
import Statistics from './components/Statistics'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }
  
  return(
    <>
      <h2>Give Feedback</h2>
      <Button onClick={handleGood} label='Good'/>
      <Button onClick={handleNeutral} label='Neutral'/>
      <Button onClick={handleBad} label='Bad'/>
      <h3>Statistics</h3>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
