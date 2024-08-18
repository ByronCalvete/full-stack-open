import { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positiveFeedback = (good * 100) / total

  if (total === 0) {
    return <p>No feedback given</p>
  }

  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={total} />
        <StatisticLine text='average' value={total && average.toFixed(3)} />
        <StatisticLine text='positive' value={total && `${positiveFeedback.toFixed(3)}%`} />
      </tbody>
    </table>
  )
}

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Button = ({ text, handle }) => <button onClick={handle}>{text}</button>

const App = () => {
  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)

  const handleClickGood = () => setGood(good + 1)
  const handleClickNeutral = () => setNeutral(neutral + 1)
  const handleClickBad = () => setBad(bad + 1)

  return (
    <>
      <h2>give feedback</h2>
      <Button text='good' handle={handleClickGood} />
      <Button text='neutral' handle={handleClickNeutral} />
      <Button text='bad' handle={handleClickBad} />
      <h3>statistics</h3>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
