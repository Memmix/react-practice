// import logo from './logo.svg';
import './App.css';

const App = ({ initialTextTwo, initialText, image }) => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={image} className="App-logo" alt="logo" />
        <p>
          {initialTextTwo} <code>src/App.js</code> {initialText}.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
