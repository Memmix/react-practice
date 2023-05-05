// import React from 'react' ---> нужно только, если будет использоваться <React.Fragment></React.Fragment>
import './Login.css'

const Login = () => {

  const handleSubmit = (event) => {
    // для того, чтобы при нажатии кнопки submit не происходила перезагрузка страницы, 
    //т.к. это противоречит основной концепции React
    event.preventDefault()
    // получение и вывод в консоль данных из формы
    console.log({
      login: event.target.username.value,
      password: event.target.password.value
    })
    // очистка данных
    event.target.reset()
  }

  return (
    // <React.Fragment></React.Fragment> <==> <></>
    <>
      <h2>Авторизация <br />(Uncontrolled)</h2>
      <form className="uncontrolled" onSubmit={handleSubmit}>
        <label htmlFor="username">
          <input type="text" name="username" placeholder='login' />
        </label>
        <label htmlFor="pass">
          <input type="password" name="password" placeholder='pass' />
        </label>
        <button type="submit">Вход</button>
      </form >
    </>
  )

}

export default Login