import Person from './Person'

const Persons = ({ persons, filterName, deletePerson }) => {
  const filteredPersons = persons.filter(person => (
    person.name.toLowerCase().includes(filterName.toLowerCase())
  ))

  return (
    <>
      {filteredPersons.map(person => (
        <Person
          key={person.id}
          person={person}
          deletePerson={() => deletePerson(person.id)}
        />
    ))}
    </>
  )
}

export default Persons
