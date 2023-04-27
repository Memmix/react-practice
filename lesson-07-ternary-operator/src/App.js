import './App.css';
import ListItem from './List-item';

const App = () => {
  return (
    <div className="App">
      <ul>
        <ListItem name="Иван" age={15} comments={0}></ListItem>
        <ListItem name="Степан" age={35} comments={120}></ListItem>
        <ListItem name="Екатерина" age={27} comments={13}></ListItem>
        <ListItem name="Гоша" age={20} comments={34}></ListItem>
      </ul>
    </div>
  )
}

export default App;
