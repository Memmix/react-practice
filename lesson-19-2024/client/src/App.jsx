import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import getUsers from './utils/getUsers'

function App() {
	const [users, setUsers] = useState([])
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getUsers()
				console.log(data)
				setUsers(data)
			} catch (err) {
				console.error(err)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [])

	return (
		<>
			<h2 style={{ color: 'red', fontSize: '50px' }}>App</h2>
			{isLoading ? (
				<h3 style={{ color: 'aqua', fontSize: '30px' }}>Loading...</h3>
			) : (
				<>
					<button
						onClick={() => {
							localStorage.clear()
							navigate('/auth/login')
						}}
					>
						logout
					</button>
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
			)}
		</>
	)
}

export default App
