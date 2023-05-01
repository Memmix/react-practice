import './App.css'
import users from './data/users'
import ListItem from './components/ListItem'

const App = () => {
  return (
    <div className="App">
      <ul>
        {
          users.map((element) => {
            return (
              <ListItem
                img={element.image}
                name={element.firstName}
              />)
          })
        }
      </ul>
    </div>
  )
}

export default App;
