import cn from 'classnames'
import { MdOutlineSecurity } from 'react-icons/md'
import { Outlet } from 'react-router-dom'
import styles from './AuthLayout.module.css'

export function AuthLayout() {
	return (
		<div className={cn(styles['layout'])}>
			<div className={cn(styles['logo'])}>
				<MdOutlineSecurity className={cn(styles['icon'])} />
			</div>

			<div className={cn(styles['content'])}>
				{/* Отображение вложенных роутов */}
				<Outlet />
			</div>
		</div>
	)
}
