import { useState } from 'react'
import './App.css'
import Counter from './components/Counter'
import Button from './components/Button'

const App = () => {
  console.log('rendered')
  const [count, setCount] = useState(0)

  const addOne = () => {
    setCount(count + 1)
  }

  const subtractOne = () => {
    setCount(count - 1)
  }

  const addRandom = () => {
    setCount(count + Math.floor(Math.random() * 10))
  }

  const subtractRandom = () => {
    setCount(count - Math.floor(Math.random() * 10))
  }

  return (
    <div className="App">
      <div className="container">

        <Counter count={count} />

        <div className="buttons">
          <Button fn={addOne} text={'+ 1'} />
          <Button fn={subtractOne} text={'- 1'} />
          <Button fn={addRandom} text={'+ random'} />
          <Button fn={subtractRandom} text={'- random'} />
        </div>
      </div>
    </div>
  )
}

export default App;
