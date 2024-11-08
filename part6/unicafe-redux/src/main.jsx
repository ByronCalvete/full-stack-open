import { createRoot } from 'react-dom/client'
import { createStore } from 'redux'
import counterReducer from './reducers/reducer'

const store = createStore(counterReducer)

const App = () => {
  return (
    <>
      <div>
        <button onClick={() => store.dispatch({ type: 'GOOD' })}>good</button>
        <button onClick={() => store.dispatch({ type: 'OK' })}>ok</button>
        <button onClick={() => store.dispatch({ type: 'BAD' })}>bad</button>
        <button onClick={() => store.dispatch({ type: 'ZERO' })}>reset stats</button>
      </div>
      <div>
        {Object.entries(store.getState()).map(stat => (
          <p key={stat[0]}>{stat[0]}: {stat[1]}</p>)
        )}
      </div>
    </>
  )
}

const root = createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
