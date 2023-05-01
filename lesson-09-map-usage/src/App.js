import './App.css'
import Block from './components/Block'

const colors = ['red', 'green', 'blue', 'yellow', 'orange']

const App = () => {
  return (
    <div className="App">
      <div className="container">
        {
          colors.map((element) => {
            return <Block color={element} key={element} /> // key = "id"
          })
        }
      </div>
    </div>
  )
}

export default App;
