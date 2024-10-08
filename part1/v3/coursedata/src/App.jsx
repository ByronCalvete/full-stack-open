import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const Display = ({ value }) => <p>{value}</p>

const App = () => {
  const [ value, setValue ] = useState(10)

  const setToValue = (newValue) => {
    console.log(`value now ${newValue}`)
    setValue(newValue)
  }

  return (
    <>
      <Display value={value} />
      <Button handleClick={() => setToValue(1000)} text='thousand' />
      <Button handleClick={() => setToValue(0)} text='reset' />
      <Button handleClick={() => setToValue(value + 1)} text='increment' />
    </>
  )
}

export default App
