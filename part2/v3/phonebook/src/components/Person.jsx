const Person = ({ person, onDeletePerson }) => {
  return (
    <p>
      {person.name} {person.number}
      <button onClick={onDeletePerson}>delete</button>
    </p>
  )
}

export default Person
