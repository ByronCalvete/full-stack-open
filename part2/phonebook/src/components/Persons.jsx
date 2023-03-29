const Persons = ({ persons, filtered, handleClickDelete }) => {
  return (
    <>
      {
        persons
          .filter(person => person.name.toLowerCase().includes(filtered.toLowerCase()))
          .map((person) => (
            <p key={person.name}>
              {person.name} {person.number.slice(0,3)}-{person.number.slice(3)} <button onClick={() => handleClickDelete(person.id)}>delete</button>
            </p>
          ))
      }
    </>
  )
}

export default Persons
