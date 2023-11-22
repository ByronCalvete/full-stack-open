const Statistics = ({ good, neutral, bad, total }) => {
  const average = (good - bad)/total
  const positive = (good / total)*100

  return(
    <>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>All {total}</p>
      <p>Average {average ? average : 0}</p>
      <p>Positive {positive ? positive : 0}%</p>
    </>
  )
}

export default Statistics
