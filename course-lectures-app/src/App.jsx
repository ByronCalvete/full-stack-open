import { useState } from 'react'

const History = ({ allClicks }) => {
  return (
    allClicks.length === 0
      ? <p>the app is used by pressing the buttons</p>
      : <p>button press history {allClicks.join(' ')}</p>
  )
}

const Button = ({ name, handleClick }) => (
  <button onClick={handleClick}>{name}</button>
)

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAllClicks] = useState([])

  const handleClickButton = (direction, letter) => {
    return () => {
      letter === 'L' && setLeft(direction + 1)
      letter === 'R' && setRight(direction + 1)
      setAllClicks([...allClicks, letter])
    }
  }

  return (
    <>
      {left}
      <Button handleClick={handleClickButton(left, 'L')} name='left'/>
      <Button handleClick={handleClickButton(right, 'R')} name='right'/>
      {right}
      <History allClicks={allClicks} />
      <p>Total clicks {allClicks.length}</p>
    </>
  )
}

export default App
