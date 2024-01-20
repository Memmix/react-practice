import { MouseEvent } from 'react'
import './App.css'
import Button from './components/Button/Button'
import Input from './components/Input/Input'

function App() {
	const addCounter = (e: MouseEvent) => {
		console.log(e)
		console.log('Кнопка нажата')
	}

	return (
		<>
			<Button onClick={addCounter}>Кнопка</Button>
			<Input />
		</>
	)
}

export default App
