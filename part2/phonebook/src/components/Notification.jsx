const Notification = ({ person, update = false }) => {
  return (
    <div className="person">
      {update ? 'Updated' : 'Added'} {person}
    </div>
  )
}

export default Notification
