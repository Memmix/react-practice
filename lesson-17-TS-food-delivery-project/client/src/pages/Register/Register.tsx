import axios, { AxiosError } from 'axios'
import cn from 'classnames'
import { FormEvent, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Button from '../../components/Button/Button'
import Heading from '../../components/Heading/Heading'
import Input from '../../components/Input/Input'
import { PREFIX } from '../../helpers/API'
import styles from './Register.module.css'

export type RegisterForm = {
	email: { value: string }
	password: { value: string }
}

export function Register() {
	const [error, setError] = useState<string | undefined>()

	const submit = async (e: FormEvent) => {
		e.preventDefault()
		const target = e.target as typeof e.target & RegisterForm
		const { email, password } = target
		console.log(email.value, password.value)
		await sendRegister(email.value, password.value)
	}

	const sendRegister = async (email: string, password: string) => {
		try {
			const { data } = await axios.post(`${PREFIX}/auth/register`, {
				email,
				password
			})
			console.log(data)
		} catch (err) {
			if (err instanceof AxiosError) {
				setError(err.response?.data.message)
			}
		}
	}

	return (
		<>
			<Heading className={cn(styles['heading'])}>Register</Heading>
			{error && <p className={cn(styles['error'])}>{error}</p>}
			<form className={cn(styles['register-form'])} onSubmit={submit}>
				<div className={cn(styles['register-container'])}>
					<p className={cn(styles['text'])}>Your E-mail:</p>
					<Input
						name='email'
						className={cn(styles['input'])}
						type='text'
						placeholder='user e-mail'
					/>
				</div>
				<div className={cn(styles['password-container'])}>
					<p className={cn(styles['text'])}>Your Password:</p>
					<Input
						name='password'
						className={cn(styles['input'])}
						type='password'
						placeholder='password'
					/>
				</div>
				<Button className={cn(styles['button'])}>Register</Button>
				<div className={cn(styles['noacc-container'])}>
					<p className={cn(styles['text'])}>already has account?</p>
					<NavLink to={'/auth/login'} className={cn(styles['link'])}>
						Login
					</NavLink>
				</div>
			</form>
		</>
	)
}
