import cn from 'classnames'
import { FormEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import Heading from '../../components/Heading/Heading'
import Input from '../../components/Input/Input'
import { AppDispatch, RootState } from '../../store/store'
import { login, userActions } from '../../store/user.slice'
import styles from './Login.module.css'

export type LoginForm = {
	email: { value: string }
	password: { value: string }
}

export function Login() {
	const navigate = useNavigate()
	// useDispatch - обеспечивает возможность делать dispatch на всю функцию
	// передавая сюда AppDispatch type мы теперь имеем возможность выполнять dispatch для нашего store
	const dispatch = useDispatch<AppDispatch>()
	const access_token = useSelector(
		(state: RootState) => state.user.access_token
	)
	const loginError = useSelector(
		(state: RootState) => state.user.loginErrorMessage
	)

	useEffect(() => {
		if (access_token) {
			navigate('/')
		}
	}, [access_token, navigate])

	const submit = async (e: FormEvent) => {
		e.preventDefault()
		dispatch(userActions.clearLoginError())
		const target = e.target as typeof e.target & LoginForm
		const { email, password } = target
		await sendLogin(email.value, password.value)
	}

	const sendLogin = async (email: string, password: string) => {
		// использования redux для авторизации
		dispatch(login({ email, password }))

		// try {
		// 	const { data } = await axios.post<ILoginResponse>(
		// 		`${PREFIX}/auth/login`,
		// 		{
		// 			email,
		// 			password
		// 		}
		// 	)
		// 	// ? варианты хранения токена
		// 	// 1. Сохраняем токен в куки
		// 	// const tokenData = {
		// 	// 	access_token: data.access_token,
		// 	// 	expires_in: 60 * 60 // время жизни 1час - 3600сек
		// 	// }
		// 	// Cookies.set('access_token', JSON.stringify(tokenData), {
		// 	// 	expires: tokenData.expires_in
		// 	// })
		// 	// 2. Сохраняем токен в localstorage
		// 	// localStorage.setItem('access_token', data.access_token)
		// 	// 3. Сохраняем токен в store Redux
		// 	dispatch(userActions.addToken(data.access_token))
		// 	// редирект после успешного логина
		// 	if (data.access_token) {
		// 		navigate('/')
		// 	}
		// } catch (err) {
		// 	if (err instanceof AxiosError) {
		// 		setError(err.response?.data.message)
		// 	}
		// }
	}

	return (
		<>
			<Heading className={cn(styles['heading'])}>Login</Heading>
			{loginError && <p className={cn(styles['error'])}>{loginError}</p>}
			<form className={cn(styles['login-form'])} onSubmit={submit}>
				<div className={cn(styles['login-container'])}>
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
				<Button className={cn(styles['button'])}>Login</Button>
				<div className={cn(styles['noacc-container'])}>
					<p className={cn(styles['text'])}>no account?</p>
					<NavLink to={'/auth/register'} className={cn(styles['link'])}>
						Register
					</NavLink>
				</div>
			</form>
		</>
	)
}
