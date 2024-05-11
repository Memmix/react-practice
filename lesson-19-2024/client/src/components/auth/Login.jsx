import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import login from '../../utils/login'

function Login() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const [user, setUser] = useState('')
	const navigate = useNavigate()

	useEffect(() => {
		if (user) navigate('/')
		if (!user) navigate('/auth/login')
	}, [user])

	const loginUser = async data => {
		const result = await login(data)
		if (result.user) {
			localStorage.setItem('user', JSON.stringify(result.user))
			setUser(localStorage.getItem('user'))
		}
	}

	return (
		<div className='login'>
			<h2 style={{ color: 'blue', fontSize: '30px' }}>Login</h2>
			<input
				type='text'
				placeholder='login'
				value={username}
				onChange={e => setUsername(e.target.value)}
			/>
			<input
				type='password'
				placeholder='password'
				value={password}
				onChange={e => setPassword(e.target.value)}
			/>
			<button onClick={() => loginUser({ username, password })}>Login</button>
		</div>
	)
}

export default Login
