import cn from 'classnames' // импорт утилиты для работы с классами
import { NavLink, Outlet } from 'react-router-dom' // импорт компонентов ссылки и отображения вложенных роутов
import styles from './Layout.module.css' // импорт стилей из CSS модуля

export function Layout() {
	return (
		<>
			<div>
				<NavLink
					to='/menu' // устанавливаем путь ссылки к определенному роуту
					className={(
						{ isActive } // динамически устанавливаем классы в зависимости от активности NavLink
					) => cn(styles['link'], { [styles.active]: isActive })}
				>
					Меню
				</NavLink>

				<NavLink
					to='/cart' // устанавливаем путь ссылки к определенному роуту
					className={(
						{ isActive } // динамически устанавливаем классы в зависимости от активности NavLink
					) => cn(styles['link'], { [styles.active]: isActive })}
				>
					Корзина
				</NavLink>
			</div>

			<div>
				{/* Отображение вложенных роутов */}
				<Outlet />
			</div>
		</>
	)
}
