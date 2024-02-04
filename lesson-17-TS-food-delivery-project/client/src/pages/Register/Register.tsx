import cn from 'classnames'
import { FormEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import Heading from '../../components/Heading/Heading'
import Input from '../../components/Input/Input'
import { AppDispatch, RootState } from '../../store/store'
import { register, userActions } from '../../store/user.slice'
import styles from './Register.module.css'

export type RegisterForm = {
	email: { value: string }
	password: { value: string }
	// потом добавить и типизировать недостающие поля
}

export function Register() {
	const navigate = useNavigate()
	const dispatch = useDispatch<AppDispatch>()
	const regiserSuccess = useSelector(
		(state: RootState) => state.user.registerSuccess
	)
	const registerErrorMessage = useSelector(
		(state: RootState) => state.user.registerErrorMessage
	)

	useEffect(() => {
		if (regiserSuccess) {
			navigate('/auth/login')
		}
	}, [regiserSuccess, navigate])

	const submit = async (e: FormEvent) => {
		e.preventDefault()
		dispatch(userActions.clearRegisterError())
		const target = e.target as typeof e.target & RegisterForm
		const { email, password } = target
		dispatch(register({ email: email.value, password: password.value }))
	}

	return (
		<>
			<Heading className={cn(styles['heading'])}>Register</Heading>
			{registerErrorMessage && (
				<p className={cn(styles['error'])}>{registerErrorMessage}</p>
			)}
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
