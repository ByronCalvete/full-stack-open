const PersonForm = ({ handleSubmit, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:
        <input
          value={newName}
          onChange={handleNameChange}
          required
        />
      </div>
      <div>
        number:
        <input
          value={newNumber}
          onChange={handleNumberChange}
          required
        />
      </div>
      <button>add</button>
    </form>
  )
}

export default PersonForm
