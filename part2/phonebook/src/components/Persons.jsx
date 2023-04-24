const Persons = ({ persons, filtered, handleClickDelete }) => {
  return (
    <>
      {
        persons
          .filter(person => person.name.toLowerCase().includes(filtered.toLowerCase()))
          .map((person) => (
            <p key={person.id}>
              {person.name} {person.number} <button onClick={() => handleClickDelete(person.id)}>delete</button>
            </p>
          ))
      }
    </>
  )
}

export default Persons
