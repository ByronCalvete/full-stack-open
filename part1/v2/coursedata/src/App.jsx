import { useState } from 'react'

import Display from './components/Display'
import Button from './components/Button'

const log = (text, variable) => console.log(text, variable)

const App = () => {
  const [counter, setCounter] = useState(0)
  log('rendering with counter value', counter)

  const increaseByOne = () => {
    log('increasing, value before', counter)
    setCounter(counter + 1)
  }

  const decreaseByOne = () => {
    log('decreasing, value before', counter)
    counter > 0 && setCounter(counter - 1)
  }

  const handleReset = () => {
    log('resetting to zero, value before', counter)
    setCounter(0)
  }

  return (
    <>
      <Display counter={counter}/>
      <Button label='plus' handleClick={increaseByOne}/>
      <Button label='minus' handleClick={decreaseByOne}/>
      <Button label='reset' handleClick={handleReset}/>
    </>
  )
}

export default App
