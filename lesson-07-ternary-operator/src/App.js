import './App.css';
import ListItem from './List-item';

const App = () => {
  return (
    <div className="App">
      <ul>
        <ListItem name="Иван" age={44} comments={10} />
        <ListItem name="Пётр" age={4} comments={true} />
        <ListItem name="Пётр" age={14} comments={1230} />
        <ListItem name="Пётр" age={43} />
      </ul>
    </div>
  )
}

export default App;
