import Person from './Person'

const Persons = ({ personFiltered, deletePerson }) => {
  return (
    <>
      {personFiltered.map(person => (
        <Person
          key={person.id}
          person={person}
          deletePerson={deletePerson}
        />
      ))}
    </>
  )
}

export default Persons
