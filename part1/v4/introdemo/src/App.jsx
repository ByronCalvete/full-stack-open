import { useState } from 'react'

const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ title, onClick }) => <button onClick={onClick}>{title}</button>

const App = () => {
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const setToZero = () => setCounter(0)
  const decrementByOne = () => setCounter(counter - 1)

  return (
    <>
      <Display counter={counter}/>
      <Button onClick={increaseByOne} title='plus' />
      <Button onClick={setToZero} title='zero' />
      <Button onClick={decrementByOne} title='minus' />
    </>
  )
}

export default App
