import { useState, useEffect } from 'react'

const App = () => {
  const [ value, setValue ] = useState('')
  const [ rates, setRates ] = useState([])
  const [ currency, setCurrency ] = useState(null)

  useEffect(() => {
    console.log(`effect run, currency is now ${currency}`)

    if (currency) {
      console.log(`fetching exchange rates...`)
      fetch(`https://open.er-api.com/v6/latest/${currency}`)
        .then(response => response.json())
        .then(json => {
          setRates(json.rates)
        })
    }
  }, [currency])

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const onSearch = (e) => {
    e.preventDefault()
    setCurrency(value)
  }

  return (
    <div>
      <form onSubmit={onSearch}>
        currency: <input value={value} onChange={handleChange} />
        <button type='submit'>exchange rate</button>
      </form>
      <pre>
        {rates.length === 0
          ? <p>No data available yet!</p>
          : JSON.stringify(rates, null, 2)
        }
      </pre>
    </div>
  )
}

export default App
