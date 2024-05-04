import { useState } from 'react'
import login from '../../utils/login'

function Login() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const loginUser = async data => {
		const result = await login(data)
		console.log(result)
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
