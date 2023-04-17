const App = () => { // функциональный компонент
  let [buttonText, setButtonText] = React.useState('?clicked') // хук, позволяющий работать с состояниями
  // buttonText - переменная, которая содержит строку с начальным значением 'click'
  // setButtonText - функция, с помощью которой мы можем указать новое значение для buttonText
  let [classBtn, setClassBtn] = React.useState('')

  const btnClick = () => {
    setButtonText('clicked!')
    setClassBtn('red')
  }

  return (
    <div className="app">
      <button className={classBtn} onClick={btnClick}>{buttonText}</button>
    </div>
  )
}

const container = document.getElementById("app")
const root = ReactDOM.createRoot(container)
root.render(<App />)