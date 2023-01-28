import { useState } from "react";

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('Sherlock Holmes')
  const [newNumber, setNewNumber] = useState('89-23-6423999')
  const [searchInpt, setNewSearchInpt] = useState('')
  
  
  //event handlers
  const addName = (event) => {
    event.preventDefault()    
    
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
    setNewSearchInpt(event.target.value)    
  }

  return(
    <div>
      <h2>Phonebook</h2>

      <Filter inpt = {searchInpt} handler={handleSearchInpt}/>

      <h3>Add A new</h3>

      <PersonForm nameInpt={newName} numberInpt={newNumber} nameHandler ={handleNameChange} numberHandler={handleNumberChange} addHandler={addName}/>

      <h3>Numbers</h3>

      <Persons persons={persons} inpt={searchInpt}/>
      
    </div>
  )

}

//components
const Filter = ({inpt, handler}) => {
  
  return (
    <div>
        filter shown with: <input
        value={inpt}
        onChange={handler} />
      </div>
  )
}

const PersonForm = ({nameInpt, numberInpt, nameHandler, numberHandler, addHandler }) => {
  return (
    <form>
        <div>
          name: <input 
          value={nameInpt}
          onChange = {nameHandler}/>          
        </div>
        <div>
          number: <input
          value={numberInpt}
          onChange = {numberHandler} />
        </div>
        <div>
          <button type='submit' 
          onClick={addHandler}>add</button>
        </div>        
      </form>
  )
}

const Persons = ({persons, inpt}) => {
  const filteredResults = persons.filter(somePerson => 
    somePerson.name.toLowerCase().includes(inpt.toLowerCase()))   

  return (filteredResults.map(person =>
    <p key={person.id}>{person.name}: {person.number}</p>
  )
  )
  
}

export default App;
