const Persons = ({ filteredPeople, handleDelete }) => {
  return(
    <>
      {filteredPeople.map(person => (
        <p key={person.id}>{person.name} {person.number} <button onClick={() => handleDelete(person.id)}>delete</button></p>
      ))}
    </>
  )
}

export default Persons
