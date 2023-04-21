const App = (props) => { // props - это свойства, которые будут указываться при рендеринге

  // изменять свойства в React крайне не рекомендуется 
  // в этом примере свойства не меняются

  // const App = ({initialButtonText, initialClassList}) => {...} - так можно было деструтуризировать свойство из объекта props, а дальше просто пользоваться initialButtonText и initialClassList


  const [buttonText, setButtonText] = React.useState(props.initialButtonText) //получение значения свойства initialButtonText
  const [classList, setClassList] = React.useState(props.initialClassList) //получение значения свойства initialClassList

  const onButtonClick = () => {
    setButtonText('clicked!')
    setClassList('red')
  }

  return (
    // className, onClick являются свойствами
    <div className="app">
      <button className={classList} onClick={onButtonClick}>
        {buttonText}
      </button>
    </div >
  )
}

const container = document.getElementById('app')
const root = ReactDOM.createRoot(container)
root.render(<App initialButtonText="clicked?" initialClassList="" />) // передача свойств: <tag props />