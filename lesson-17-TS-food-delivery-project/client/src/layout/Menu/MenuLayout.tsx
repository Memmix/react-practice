import cn from 'classnames' // импорт утилиты для работы с классами
import { NavLink, Outlet, useNavigate } from 'react-router-dom' // импорт компонентов ссылки и отображения вложенных роутов
import Button from '../../components/Button/Button'
import styles from './MenuLayout.module.css' // импорт стилей из CSS модуля

export function MenuLayout() {
	const navigate = useNavigate()

	const logout = () => {
		// Cookies.remove('access_token')
		localStorage.removeItem('access_token')
		navigate('/auth/login')
	}

	return (
		<div className={cn(styles['layout'])}>
			<div className={cn(styles['menu'])}>
				<div className={cn(styles['user'])}>
					<img
						className={cn(styles['avatar'])}
						src='./avatar.jpg'
						alt='avatar'
					/>
					<div className={cn(styles['name-and-email'])}>
						<p className={cn(styles['name'])}>Homer Simpson</p>
						<p className={cn(styles['email'])}>homer.simpson@gmail.com</p>
					</div>
				</div>
				<div className={cn(styles['navigation'])}>
					<NavLink
						to='/menu' // устанавливаем путь ссылки к определенному роуту
						className={(
							{ isActive } // динамически устанавливаем классы в зависимости от активности NavLink
						) => cn(styles['link'], { [styles.active]: isActive })}
					>
						Menu
					</NavLink>

					<NavLink
						to='/cart' // устанавливаем путь ссылки к определенному роуту
						className={(
							{ isActive } // динамически устанавливаем классы в зависимости от активности NavLink
						) => cn(styles['link'], { [styles.active]: isActive })}
					>
						Cart
					</NavLink>
					<Button className={cn(styles['logout'])} onClick={() => logout()}>
						Logout
					</Button>
				</div>
			</div>

			<div className={cn(styles['content'])}>
				{/* Отображение вложенных роутов */}
				<Outlet />
			</div>
		</div>
	)
}
