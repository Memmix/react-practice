import cn from 'classnames' // импорт утилиты для работы с классами
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet, useNavigate } from 'react-router-dom' // импорт компонентов ссылки и отображения вложенных роутов
import Button from '../../components/Button/Button'
import { getCartFromDB } from '../../store/cart.slice'
import { AppDispatch, RootState } from '../../store/store'
import { getProfile, userActions } from '../../store/user.slice'
import styles from './MenuLayout.module.css' // импорт стилей из CSS модуля

export function MenuLayout() {
	const navigate = useNavigate()
	const dispatch = useDispatch<AppDispatch>()
	const profile = useSelector((state: RootState) => state.user.profile)
	const products = useSelector((state: RootState) => state.cart.products)

	useEffect(() => {
		dispatch(getProfile())
	}, [dispatch])

	useEffect(() => {
		if (profile?._id) dispatch(getCartFromDB(profile._id))
	}, [dispatch, profile])

	const logout = () => {
		// Cookies.remove('access_token')
		// localStorage.removeItem('access_token')
		dispatch(userActions.logout())
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
						<p className={cn(styles['email'])}>{profile?.email}</p>
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
						Cart (
						{Array.isArray(products)
							? products.reduce((acc, el) => acc + el.count, 0)
							: 0}
						)
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
