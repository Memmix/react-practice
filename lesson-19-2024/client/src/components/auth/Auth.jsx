import { NavLink, Outlet } from 'react-router-dom'

function Auth() {
	return (
		<>
			<h2 style={{ color: 'red', fontSize: '50px' }}>Auth</h2>
			<NavLink to='/auth/login'>Логин</NavLink> <br />
			<NavLink to='/auth/register'>Регистрация</NavLink>
			<Outlet />
		</>
	)
}

export default Auth
