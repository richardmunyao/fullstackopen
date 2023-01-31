import { useEffect, useState } from "react";
import phonebook from "./services/phonebook";

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('Sherlock Holmes')
  const [newNumber, setNewNumber] = useState('89-23-6423999')
  const [searchInpt, setNewSearchInpt] = useState('')
  const [statusMsg, setStatusMsg] = useState(null)

  //effect hook to update component with persons
  const hook = () => {
    phonebook
      .getAll()
      .then(returnedPersons => {
        setPersons(returnedPersons)
      })
  }
  useEffect(hook, [])


  //event handlers
  const addName = (event) => {
    event.preventDefault()

    const alreadyExists = (persons.find(personX => personX.name === newName))
    if (alreadyExists) {
      if (alreadyExists.number !== newNumber) {
        if (window.confirm(
          `${alreadyExists.name} is already added to phonebook, replace the
          old number with a new one?`)) {
          changeNumber(alreadyExists, newNumber)
        }
      } else {
          setStatusMsg(['error', `${newName} is already added to the phonebook `])
          setTimeout(()=> {
            setStatusMsg(null)
          },5000)
      }

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
        .catch (error => {
          setStatusMsg(['error', `Error: Could not add ${newName} to phonebook`])
          setTimeout ( ()=> { setStatusMsg(null)}, 5000 )
        })
        //if no error:
        setStatusMsg(['success', `${newName} was added to phonebook`])
        setTimeout ( ()=> { setStatusMsg(null)}, 5000 )
      setNewName('')
      setNewNumber('')
    }
  }

  const changeNumber = (person, newNumber) => {
    const newPersonObj = {
      name: person.name,
      number: newNumber,
    }

    phonebook
      .changeNumber(person.id, newPersonObj)
      .then(returnedPerson => {
        setPersons(persons.map(tmpPersn => tmpPersn.id !== person.id ? tmpPersn : returnedPerson))
      })
      .catch (error => {       
        const errorStatus = error.response.status        
        setStatusMsg(['error',  `Error ${errorStatus}: ${person.name} has already been removed from server `])
        setTimeout( ()=> { setStatusMsg(null)}, 5000 )
      })
      //if no error
      setStatusMsg(['success', `${person.name}'s' number has been changed`])
      setTimeout( ()=> { setStatusMsg(null)}, 5000 )

  }

  //delete button event listener
  const handledeletePerson = (event, name) => {

    if (window.confirm(`Delete ${name} ?`)) {
      phonebook
        .removePerson(event.target.id)
        .then(response => {
          //optional: check if response.status===200
          if (response.status === 200) {
            //update state from db:
            hook()
          }
        })
        .catch(error => {          
          setStatusMsg(['error', `${name} was already deleted from the server`])
          setTimeout( ()=> { setStatusMsg(null)}, 5000 )
        })
        // if no error:
        setStatusMsg(['success', `${name} has been deleted from the phonebook`])
        setTimeout( ()=> { setStatusMsg(null)}, 5000 )


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

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={statusMsg} />

      <Filter inpt={searchInpt} handler={handleSearchInpt} />

      <h3>Add A new</h3>

      <PersonForm nameInpt={newName} numberInpt={newNumber} nameHandler={handleNameChange} numberHandler={handleNumberChange} addHandler={addName} />

      <h3>Numbers</h3>

      <Persons persons={persons} inpt={searchInpt} deletePerson={handledeletePerson} />

    </div>
  )

}

//components
const Filter = ({ inpt, handler }) => {

  return (
    <div>
      filter shown with: <input
        value={inpt}
        onChange={handler} />
    </div>
  )
}

const PersonForm = ({ nameInpt, numberInpt, nameHandler, numberHandler, addHandler }) => {
  return (
    <form>
      <div>
        name: <input
          value={nameInpt}
          onChange={nameHandler} />
      </div>
      <div>
        number: <input
          value={numberInpt}
          onChange={numberHandler} />
      </div>
      <div>
        <button type='submit'
          onClick={addHandler}>add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, inpt, deletePerson }) => {
  const filteredResults = persons.filter(somePerson =>
    somePerson.name.toLowerCase().includes(inpt.toLowerCase()))

  return (filteredResults.map(person =>
    <p key={person.id}>{person.name}: {person.number}
      <button id={person.id} onClick={(event) => deletePerson(event, person.name)}>delete</button>
    </p>
  )
  )

}

const Notification = ({message}) => {
  
  //define styles for success and error  
  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10   
  }

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10   
  }

  if (message === null) {
    return null
  }
  const type = message[0]
  if(type === 'success') {
    return <div style={successStyle}>{message[1]}</div>
  }
  else if (type === 'error') {
    return <div style={errorStyle}>{message[1]}</div>
  }

}

export default App;
