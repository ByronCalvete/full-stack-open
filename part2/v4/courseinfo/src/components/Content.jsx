import Part from './Part'

const Content = ({ parts }) => {
  const exercises = parts.map(part => part.exercises)
  const allExercises = exercises.reduce((accu, current) => (
    accu + current
  ), 0)

  return (
    <>
      {parts.map(part => (
        <Part
          key={part.id}
          part={part}
        />
      ))}
      <p><strong>total of {allExercises} exercises</strong></p>
    </>
  )
}

export default Content