import {useState, useEffect} from 'react'
import axios from 'axios'


const App = () => {  
  const [notes, setNotes] = useState([])
  
  //effect hook to update component
  const hook = () => {
    axios
    .get('http://localhost:3001/api/notes')
    .then(response => {      
      setNotes(response.data)
    })   
  }  
  useEffect(hook, [])    

  return (
    <div>
      <h1>Hello world. Good</h1>
      <ul>
        {notes.map(note =>         
          <li key={note.id}>{note.content}</li>)}
      </ul>      
    </div>
  )
}
export default App;
