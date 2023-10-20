import { useState, useEffect } from "react"
import LeftPanel from "./layouts/Menu/LeftPanel"
import Body from "./layouts/Body/Body"
import Header from "./components/Header/Header"
import JournalAddButton from "./components/JournalAddButton/JournalAddButton"
import MenuList from "./components/MenuList/MenuList"
import JournalForm from "./components/JournalForm/JournalForm"

import "./App.css"

function App() {
  const [arrItems, setArrItems] = useState([])

  // хуки всегда на верхнем уровне
  // хуки нельзя запихнуть в выражения, например в if

  // получение данных из localStorage, зависимость: отсутствует
  useEffect(() => {
    setArrItems(JSON.parse(localStorage.getItem("data")))
  }, [])

  // отправка данных в localStorage, зависимость: items
  useEffect(() => {
    if (arrItems.length) {
      localStorage.setItem("data", JSON.stringify(arrItems))
    }
  }, [arrItems])

  const addItem = (item) => {
    setArrItems([...arrItems, item])
  }

  return (
    <div className="app">
      <div className="header">
        <Header />
      </div>
      <div className="content">
        <LeftPanel>
          <JournalAddButton />
          <MenuList className="menuList" items={arrItems} />
        </LeftPanel>
        <Body>
          <JournalForm addItem={addItem} />
        </Body>
      </div>
    </div>
  )
}

export default App
