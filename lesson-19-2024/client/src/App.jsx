import { useEffect, useState } from 'react'
import './App.css'
import getUsers from './utils/getUsers'

function App() {
	const [users, setUsers] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getUsers()
				console.log(data)
				setUsers(data)
			} catch (err) {
				console.error(err)
			}
		}

		fetchData()
	}, [])

	return (
		<>
			<h2 style={{ color: 'red', fontSize: '50px' }}>App</h2>
			<ul>
				{users.map(user => {
					return (
						<li key={user.name}>
							{user.name}, {user.age}
						</li>
					)
				})}
			</ul>
		</>
	)
}

export default App
