import { useEffect, useState } from 'react'
import './App.css';

function App() {

  console.log('test')
  // изначально значение todo мы устанавливаем как null
  const [todo, setTodo] = useState(null)
  // Важно: работает асинхронно
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      // после ответа от сервера, мы вызываем функцию setTodo и меняем
      // значение для todo на то, что мы получили от сервера
      .then(json => setTodo(json))
  }, []) // [] - зависимости

  return (

    <div className="App">
      {todo && <p>{todo.title}</p>} {/* чтобы дождаться ответа от сервера */}
    </div>
  )
}

export default App;