import Header from './Header'

function sumExercises(parts) {
    return parts.reduce((sum, part) => sum + part.exercises, 0)
  }
  
const Courses = ({ courses }) => {
  return (
    <div>
      {courses.map(course => 
       <div key={course.id}>
        <Header course={course.name}/>
        {course.parts.map(part => 
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        )}
        <b>
          total of {sumExercises(course.parts)} exercises
        </b>
       </div>
      )}
    </div>
  )
}

export default Courses