const Persons = ({ persons, filtered }) => {
  return (
    <>
      {
        persons
          .filter(person => person.name.toLowerCase().includes(filtered.toLowerCase()))
          .map((person) => (
            <p key={person.name}>
              {person.name} {person.number.slice(0,3)}-{person.number.slice(3)}
            </p>
          ))
      }
    </>
  )
}

export default Persons
