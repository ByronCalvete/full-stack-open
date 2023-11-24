const PersonForm = ({ addPerson, newPerson, handleNewPerson, newNumber, handleNewNumber }) => {
  return(
    <form onSubmit={addPerson}>
      <div>
        name:
        <input
          value={newPerson}
          onChange={handleNewPerson}
          required
        />
      </div>
      <div>
        number:
        <input
          type="number"
          value={newNumber}
          onChange={handleNewNumber}
          required
        />
      </div>
      <button>add</button>
    </form>
  )
}

export default PersonForm
