import { HashRouter, Route, Routes } from 'react-router-dom'

import './App.css'
import Home from './components/Home'
import Register from './components/Register'

function App() {
	return (
		<HashRouter>
			<div className='App'>
				<h1>APP:</h1>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/components/register' element={<Register />} />
				</Routes>
			</div>
		</HashRouter>
	)
}

export default App
