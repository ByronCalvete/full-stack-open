const PersonForm = ({ handleSubmit, handleChangeName, handleChangeNumber, newPerson, newNumber }) => {
  return (
    <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td>name:</td>
            <td>
              <input
                value={newPerson}
                onChange={handleChangeName}
              />
            </td>
          </tr>
          <tr>
            <td>number:</td>
            <td>
              <input
                type='number'
                value={newNumber}
                onChange={handleChangeNumber}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button type='submit'>add</button>
    </form>
  )
}

export default PersonForm
