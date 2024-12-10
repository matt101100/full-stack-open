const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = ({content}) => {
  return (
    <p>
      {content[0].name} {content[0].count} <br />
      {content[1].name} {content[1].count} <br />
      {content[2].name} {content[2].count}
    </p>

  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.ex1 + props.ex2 + props.ex3}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  // define the content and content count array
  const content = [
    {name: part1, count: exercises1},
    {name: part2, count: exercises2},
    {name: part3, count: exercises3}
  ]

  return (
    <div>
      <Header course={course} />
      <Content content={content}/>
      <Total ex1={exercises1} ex2={exercises2} ex3={exercises3} />

    </div>
  )
}

export default App