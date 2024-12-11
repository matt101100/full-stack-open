const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = ({content}) => {
  return (
    <p>
      {content[0].name} {content[0].exercises} <br />
      {content[1].name} {content[1].exercises} <br />
      {content[2].name} {content[2].exercises}
    </p>

  )
}

const Total = ({content}) => {
  return (
    <p>Number of exercises {content[0].exercises + content[1].exercises + content[2].exercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course.name} />
      
      <Content content={course.parts}/>
      <Total content={course.parts} />
    </div>
  )
}

export default App