import { useState } from 'react'
import Persons from './components/Persons'

const App = () => {
  // store the name given as input to the form
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')
  const [showAll, setShowAll] = useState(false)

  const personsToShow = showAll
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(filterString.toLowerCase()))

  const handleAddName = (event) => {
    event.preventDefault() // prevents the page from reloading on button press
    if (doesPersonExist(newName, persons)) {
      // prevent duplicate names from being added to the phonebook
      alert('${newName} is already added to phonebook')
      return
    }

    // create and add new person object if it is not already in book
    const personObject = {
      name: newName,
      number: newNumber,
      important: Math.random() < 0.5,
      id: String(persons.length + 1)
    }
    // updates the persons array with the new contact
    setPersons(persons.concat(personObject))
    setNewName('') // reset input field to default empty value
    setNewNumber('')
  }

  // updates the newName state value to the last string in the input field
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

  const doesPersonExist = (name, persons) => {
    return persons.some(person => person.name === name)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={handleAddName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h3>Filter</h3>
      <div>
        contains string: <input value={filterString} onChange={handleFilterChange}/>
      </div>

      <h2>Numbers</h2>
      <Persons persons={personsToShow}/>
    </div>
  )
}

export default App