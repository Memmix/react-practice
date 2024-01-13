import cn from 'classnames'
import { NavLink, Outlet } from 'react-router-dom'
import styles from './Layout.module.css'

export function Layout() {
	return (
		<>
			<div>
				<NavLink
					to='/menu'
					className={({ isActive }) =>
						cn(styles['link'], { [styles.active]: isActive })
					}
				>
					Меню
				</NavLink>
				<NavLink
					to='/cart'
					className={({ isActive }) =>
						cn(styles['link'], { [styles.active]: isActive })
					}
				>
					Корзина
				</NavLink>
			</div>
			<div>
				<Outlet />
			</div>
		</>
	)
}
