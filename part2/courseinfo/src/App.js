
const App = () => {

  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    <div>
      <h1>Web development curriculum</h1>     
      {courses.map(course =>
        <Course key={course.id} course={course} />)
        }
    </div>
  )  
}

const Course = ({course}) => {
  // console.log(course)  
  const parts = course.parts
  // console.log("parts: ",parts)
  const total = parts.reduce(function (accumulator, currValue){
    return accumulator + currValue.exercises
  }, 0)
  // console.log("total",total)
  
  return(
    <div>
      <h2>{course.name}</h2>
      {parts.map(part =>
        <p key={part.id}>{part.name}: {part.exercises}</p>)}  
      <b>total of {total} exercises</b>      
      
    </div>
  )
}

export default App;
