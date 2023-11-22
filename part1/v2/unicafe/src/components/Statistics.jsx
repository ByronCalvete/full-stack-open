const Statistics = ({ good, neutral, bad }) => {
  const totalFeedback = good + neutral + bad
  const average = (good - bad)/totalFeedback
  const positive = (good / totalFeedback)*100

  return(
    <>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>All {totalFeedback}</p>
      <p>Average {average ? average : 0}</p>
      <p>Positive {positive ? positive : 0}%</p>
    </>
  )
}

export default Statistics
