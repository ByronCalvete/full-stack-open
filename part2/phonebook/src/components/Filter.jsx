const Filter = ({ filtered, handleChangeFilter }) => {
  return (
    <>
      <h2>Add a new</h2>
      <div>filter shown with <input value={filtered} onChange={handleChangeFilter}/></div>
    </>
  )
}

export default Filter
