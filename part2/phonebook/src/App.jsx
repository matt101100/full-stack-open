import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import serverUtils from './services/serverUtils'

const App = () => {
  // store the name given as input to the form
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  // filter persons by user specified string
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterString.toLowerCase()))

  const doesPersonExist = (name, persons) => {
    return persons.some(person => person.name === name) // case insensitive
  }

  // !! Event Handlers !!

  const handleAddName = (event) => {
      event.preventDefault() // prevents the page from reloading on button press
      if (doesPersonExist(newName, persons)) {
        // prevent duplicate names from being added to the phonebook
        const confirmed = window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`)
        
        if (confirmed) {
          // update number of existing name
          const existingPerson = persons.find(person => person.name === newName)
          const updatedPerson = {
            name: newName,
            number: newNumber,
            important: Math.random() < 0.5,
            id: existingPerson.id
          }
          serverUtils
            .update(updatedPerson.id, updatedPerson)
            .then((returnedPerson) => {
              setPersons(prevPersons =>
                prevPersons.map(person => 
                  person.id === returnedPerson.id ? returnedPerson : person
                )
              )
            })
            .catch(error => {
              setErrorMessage(
                `${updatedPerson.name}'s contact info has recently been removed from server`
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            })
          setErrorMessage(
            `Successfully updated ${updatedPerson.name}'s contact details`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        }
        return
      }

      // create and add new person object if it is not already in book
      const personObject = {
        name: newName,
        number: newNumber,
        important: Math.random() < 0.5,
      }
      // POST the new person to the server and update persons array
      serverUtils
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
      setErrorMessage(
        `Added ${personObject.name}`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
  }

  const handleDelete = (event, id) => {
    const confirmed = window.confirm("Are you sure you want to delete this person?")
    if (confirmed) {
      // delete the person object with specified id
      serverUtils
        .destroy(id)
        .then(() => {
          setPersons(prevPersons => prevPersons.filter(person => person.id !== id))
        })
    }
  }

  // following functions update state values to the last string in the input field
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    event.preventDefault()
    setFilterString(event.target.value)
  }

  // get data from the json-server
  useEffect(() => {
    serverUtils
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage}/>
      <PersonForm newName={newName} newNumber={newNumber} handleAddName={handleAddName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>

      <h3>Filter</h3>
      <Filter filterString={filterString} handleFilterChange={handleFilterChange}/>

      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App