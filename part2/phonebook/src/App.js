import { useState } from "react";

const App = () => {

  const [persons, setPersons] = useState([
    {name: 'Arto Hellas'}
  ])
  const [newName, setNewName] = useState('blah')

  const addName = (event) => {
    event.preventDefault()
    console.log("clicked on button")
    const newPersonObj = {
      name: newName
    }
    setPersons(persons.concat(newPersonObj))
    setNewName('')

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return(
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input 
          value={newName}
          onChange = {handleNameChange}/>          
        </div>
        <div>
          <button type='submit' 
          onClick={addName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <p key={person.name}>{person.name}</p>)}
    </div>
  )

}
export default App;
