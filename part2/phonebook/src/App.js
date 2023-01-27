import { useState } from "react";

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('blah')
  const [newNumber, setNewNumber] = useState('77-88-99')
  const [searchInpt, setNewSearchInpt] = useState('')
  
  
  const addName = (event) => {
    event.preventDefault()
    console.log("clicked on button")
    
    const alreadyExists = (persons.find(personX => personX.name === newName))
    if (alreadyExists){
      alert(`${newName} is already added to the phonebook `)

    } else {
      const newPersonObj = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(newPersonObj))
      setNewName('')
      setNewNumber('')
    }

    }

        
   

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchInpt = (event) => {
    const query = event.target.value
    // console.log(query)
    setNewSearchInpt(event.target.value)    
  }

  
  const filteredResults = persons.filter(somePerson => 
      somePerson.name.toLowerCase().includes(searchInpt.toLowerCase()))
    
      
  

  return(
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input
        value={searchInpt}
        onChange={handleSearchInpt} />
      </div>
      <div>
        <h2>Add a New</h2>
      </div>
      <form>
        <div>
          name: <input 
          value={newName}
          onChange = {handleNameChange}/>          
        </div>
        <div>
          number: <input
          value={newNumber}
          onChange = {handleNumberChange} />
        </div>
        <div>
          <button type='submit' 
          onClick={addName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredResults.map(person =>
        <p key={person.id}>{person.name}:  {person.number}</p>)}
    </div>
  )

}
export default App;
