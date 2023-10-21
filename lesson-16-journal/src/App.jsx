import LeftPanel from './layouts/Menu/LeftPanel'
import Body from './layouts/Body/Body'
import Header from './components/Header/Header'
import JournalAddButton from './components/JournalAddButton/JournalAddButton'
import MenuList from './components/MenuList/MenuList'
import JournalForm from './components/JournalForm/JournalForm'
import { useLocalStorage } from './hooks/useLocalStorage.hook'
import { ThemeContextProvider } from './context/theme.context'
import './App.css'


function App() {
	const [arrItems, setArrItems] = useLocalStorage('data')

	const addItem = (item) => {
		setArrItems([...arrItems, item])
	}

	return (
		// указываем где будет виден наш контекст
		<ThemeContextProvider>
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
		</ThemeContextProvider>
	)
}

export default App
