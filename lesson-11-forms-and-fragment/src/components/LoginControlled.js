// import React from 'react' ---> нужно только, если будет использоваться <React.Fragment></React.Fragment>
import { useState } from 'react'
import './Login.css'

const Login = () => {

  // Для оптимизации вызовов useState лучше создать объект (т.к. их может быть много):
  // const [data, setData] = useState({ userName: '', userPass: '' })
  const [userName, setUserName] = useState('')
  const [userPass, setUserPass] = useState('')


  const handleSubmit = (event) => {
    // для того, чтобы при нажатии кнопки submit не происходила перезагрузка страницы, 
    //т.к. это противоречит основной концепции React
    event.preventDefault()
    // получение и вывод в консоль данных из формы
    console.log({
      login: userName,
      password: userPass
    })
    // очистка данных
    setUserName('')
    setUserPass('')
  }

  return (
    // <React.Fragment></React.Fragment> <==> <></>
    <>
      <h2>Авторизация <br /> (Controlled)</h2>
      <form className="controlled" onSubmit={handleSubmit}>
        <label htmlFor="username">
          <input
            type="text"
            placeholder="login"
            value={userName}
            // если в useState используется объект:
            // value = {data.userName}
            onChange={(
              (event) => {
                console.log(event.target.value);
                return setUserName(event.target.value)
              })}
          // если в useState используется объект:
          // onChange = {(e)=>setData({...data, userName: e.target.value})}
          />
        </label>
        <label htmlFor="pass">
          <input
            type="password"
            placeholder="pass"
            value={userPass}
            // если в useState используется объект:
            // value = {data.userPass}
            onChange={(
              (event) => {
                console.log(event.target.value);
                return setUserPass(event.target.value)
              })}
          // если в useState используется объект:
          // onChange = {(e)=>setData({...data, userPass: e.target.value})}
          />
        </label>
        <button type="submit">Вход</button>
      </form >
    </>
  )

}

export default Login