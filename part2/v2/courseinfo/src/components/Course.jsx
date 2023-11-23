import Header from './Header'
import Content from './Content'

const Course = ({ courses }) => {
  return(
    <>
      <h1>Web development curriculum</h1>
      {courses.map(course => {
        return (
          <div key={course.id}>
            <Header title={course.name}/>
            <Content parts={course.parts}/>
          </div>
        )
      })}
    </>
  )
}

export default Course
