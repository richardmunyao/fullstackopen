const Header = (props) => {
  console.log(props)
  return (
    <>
    <h1>{props.course.name}</h1>
    </>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <>
    <p>{props.parts.parts[0].name}: {props.parts.parts[0].exercises}</p>
    <p>{props.parts.parts[1].name}: {props.parts.parts[1].exercises}</p>
    <p>{props.parts.parts[2].name}: {props.parts.parts[2].exercises}</p>
    </>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <>
    <p>Number of exercises: {props.total.parts[0].exercises + props.total.parts[1].exercises + props.total.parts[2].exercises}</p>
    </>
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
      <Header course={course}/>
      <Content parts = {course} />
      <Total total = {course} />
    </div>
  )
}
export default App;
