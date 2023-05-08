import { useState } from 'react'
import './Register.css'

const Login = () => {

  const [userName, setUserName] = useState('')
  const [userPass, setUserPass] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: userName,
        password: userPass,
      })
    };

    // http://localhost:3002/api/register
    fetch('ВАШ_ПУТЬ/api/register', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));

    setUserName('');
    setUserPass('');
  }

  const getData = (event) => {
    event.preventDefault()

    // поскольку тут fetch находится в функции обработчике событий, 
    // то useEffect не нужен, бесконечного рендеринга не будет
    // http://localhost:3002/api/users
    let users = fetch('ВАШ_ПУТЬ/api/users')
      .then(response => response.json())
      .then(json => console.log(json))

    console.log(users)
  }

  return (
    <>
      <h2>Регистрация <br /> (Controlled)</h2>
      <form className="controlled" onSubmit={handleSubmit}>
        <label htmlFor="username">
          <input
            type="text"
            placeholder="login"
            value={userName}
            onChange={(
              (event) => {
                console.log(event.target.value);
                return setUserName(event.target.value)
              })}
          />
        </label>
        <label htmlFor="pass">
          <input
            type="password"
            placeholder="pass"
            value={userPass}
            onChange={(
              (event) => {
                console.log(event.target.value);
                return setUserPass(event.target.value)
              })}
          />
        </label>
        <button type="submit">Отправить</button>
        <button onClick={getData}>GET</button>
      </form >

    </>
  )

}

export default Login