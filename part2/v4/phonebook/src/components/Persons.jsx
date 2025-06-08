const Persons = ({ personFiltered }) => {
  return (
    <>
      {personFiltered.map(person => (
        <p key={person.id}>{person.name} {person.number}</p>
      ))}
    </>
  )
}

export default Persons
