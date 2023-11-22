import StatisticLine from './StatisticLine'

const Statistics = ({ good, neutral, bad, total }) => (
  <>
    <StatisticLine name='Good' value={good} />
    <StatisticLine name='Neutral' value={neutral} />
    <StatisticLine name='Bad' value={bad} />
    <StatisticLine name='All' value={total} />
    <StatisticLine name='Average' value={(good - bad) / total} />
    <StatisticLine name='Positive' value={(good / total) * 100} />
  </>
)

export default Statistics
