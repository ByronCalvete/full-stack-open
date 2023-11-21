import { useState } from 'react'

import Button from './components/Button'
import Display from './components/Display'

const History = ({ allClicks }) => {
  if (allClicks.length === 0) {
    return (
      <div>
        The app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      Button press history: {allClicks.join(', ')}
    </div>
  )
}

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAllClicks] = useState([])
  // const [clicks, setClicks] = useState({
  //   left: 0,
  //   right:0
  // })
  
  const handleClick = (direction) => {
    direction === 'L' && setLeft(left + 1)
    direction === 'R' && setRight(right + 1)
    setAllClicks([ ...allClicks, direction ])
  }

  return(
    <div>
      <Display value={left}/>
      <Button onClick={() => handleClick('L')} label='left' />
      <Display value={right} />
      <Button onClick={() => handleClick('R')} label='right' />
      <History allClicks={allClicks} />
    </div>
  )
}

export default App;
