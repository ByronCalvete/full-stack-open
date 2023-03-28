const Header = ({ name }) => {
  return (
    <h2>{name}</h2>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => (
        <p key={part.id}>{part.name} {part.exercises}</p>
      ))}
    </>
  )
}

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)

  return (
    <>
      <p><strong>total of {totalExercises} exercies</strong></p>
    </>
  )
}

const Course = ({ courses }) => {
  return (
    <>
      <h1>Web development curriculum</h1>
      {courses.map(course => (
        <div key={course.id}>
          <Header name={course.name}/>
          <Content parts={course.parts}/>
          <Total parts={course.parts}/>
        </div>
      ))}
    </>
  )
}

const App = () => {
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <Course courses={courses} />
  )
}

export default App
