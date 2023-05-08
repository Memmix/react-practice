import './App.css';
import Block from './components/Block';

function App() {
  return (
    <div className="App">
      <Block color="green">
        <h2>Блок #1</h2>
        <span>Lorem ipsum dolor sit amet.</span>
      </Block>
      <Block color="red">
        <h2>Блок #2</h2>
        <span>Lorem ipsum dolor sit amet.</span>
      </Block>
      <Block color="yellow">
        <h2>Блок #3</h2>
        <span>Lorem ipsum dolor sit amet.</span>
      </Block>
      <Block color="blue">
        <h2>Блок #3</h2>
        <span>Lorem ipsum dolor sit amet.</span>
      </Block>
    </div >
  )
}

export default App;
