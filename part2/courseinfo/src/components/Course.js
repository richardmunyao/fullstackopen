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

  export default Course