const Notification = ({ person, type }) => {
  return (
    <>
      {
        type === 'Added' || type === 'Updated'
          ? <div className="person success">{type} {person}</div>
          : <div className="person error">{person} {type}</div>
      }
    </>
  )
}

export default Notification
