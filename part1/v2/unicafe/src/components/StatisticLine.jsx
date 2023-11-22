const StatisticLine = ({ name, value = 0 }) => (
  <tr>
    <td>{name}</td>
    <td>{value}</td>
  </tr>
)

export default StatisticLine
