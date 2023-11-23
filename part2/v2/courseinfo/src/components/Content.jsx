import Part from './Part'

const Content = ({ parts }) => {
  const sumExercises = parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)

  return(
    <>
      {parts.map(part => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
      <p><strong>total of {sumExercises} exercises</strong></p>
    </>
  )
}

export default Content
