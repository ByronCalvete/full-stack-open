const SearchFilter = ({ filteredPeople, handleChangeFiltered }) => {
  return (
    <div>
      filter shown with <input value={filteredPeople} onChange={handleChangeFiltered}/>
    </div>
  )
}

export default SearchFilter
