import { useState  } from 'react'

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const Display = ({ value }) => <div>{value}</div>

const App = () => {
  const [ value, setValue ] = useState(10)

  const setToValue = (newValue) => {
    console.log('new value', newValue)
    setValue(newValue)
  }

  return (
    <div>
      <Display value={value}/>
      <Button text='thousand' onClick={() => setToValue(1000)}/>
      <Button text='reset' onClick={() => setToValue(0)}/>
      <Button text='increment' onClick={() => setToValue(value + 1)}/>
    </div>
  )
}

export default App
