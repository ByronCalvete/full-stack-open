const Filter = ({ filterName, handleChange }) => {
  return (
    <div>
      filter shown with
      <input
        value={filterName}
        onChange={handleChange}
      />
    </div>
  )
}

export default Filter
