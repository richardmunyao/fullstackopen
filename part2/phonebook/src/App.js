import { useEffect, useState } from "react";
import axios from 'axios'
import phonebook from "./components/phonebook";

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('Sherlock Holmes')
  const [newNumber, setNewNumber] = useState('89-23-6423999')
  const [searchInpt, setNewSearchInpt] = useState('')
  
  //effect hook to update component with persons
  useEffect( () => {
    // fetch data from backed server
    phonebook
      .getAll()
      .then(returnedPersons => {
        setPersons(returnedPersons)
      })    
  },[])

  
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
        }
        // use our phonebook module to save person to backend server        
        phonebook
          .create(newPersonObj)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
          })
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
