import Person from './Person'

const Persons = ({ persons, filterName, onDeletePerson }) => {
  const filteredPersons = persons.filter(person => (
    person.name.toLowerCase().includes(filterName.toLowerCase())
  ))

  return (
    <>
      {filteredPersons.map(person => (
        <Person
          key={person.id}
          person={person}
          onDeletePerson={() => onDeletePerson(person.id)}
        />
    ))}
    </>
  )
}

export default Persons
