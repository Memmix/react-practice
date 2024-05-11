import { useState } from 'react'
import register from '../../utils/register'

function Register() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [passwordType, setPasswordType] = useState('password')

	const registerUser = async data => {
		const result = await register(data)
		console.log(result)
	}

	const togglePassword = () => {
		setPasswordType(prev => {
			if (prev === 'password') return 'text'
			else return 'password'
		})
	}

	return (
		<div className='Register'>
			<h2 style={{ color: 'blue', fontSize: '30px' }}>Register</h2>
			<input
				type='text'
				placeholder='Register'
				value={username}
				onChange={e => {
					console.log(e.target.value)
					setUsername(e.target.value)
				}}
			/>
			<input
				type={passwordType}
				placeholder='password'
				value={password}
				onChange={e => {
					console.log(e.target.value)
					setPassword(e.target.value)
				}}
			/>
			<button onClick={() => togglePassword()}>eye</button>
			<button onClick={() => registerUser({ username, password })}>
				Register
			</button>
		</div>
	)
}

export default Register
