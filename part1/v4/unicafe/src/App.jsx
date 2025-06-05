import { useState } from 'react'

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value, units }) => (
  <tr>
    <td>{text}</td>
    <td>{value}{units}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = ((good - bad) / all)
  const positive = ((good / all) * 100)

  if (all === 0) { 
    return <p>No feedback given</p>
  }

  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>  
          <StatisticLine text='good' value={good}/>
          <StatisticLine text='neutral' value={neutral}/>
          <StatisticLine text='bad' value={bad}/>
          <StatisticLine text='all' value={all} />
          <StatisticLine text='average' value={all ? average : 0} />
          <StatisticLine text='positive' value={all ? positive : 0} units='%'/>
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)

  return (
    <div>
      <h2>Give feedback</h2>
      <Button text='good' onClick={() => setGood(good + 1)}/>
      <Button text='neutral' onClick={() => setNeutral(neutral + 1)}/>
      <Button text='bad' onClick={() => setBad(bad + 1)}/>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

export default App
