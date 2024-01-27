import { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from '../store/store'

export const RequireAuth = ({ children }: { children: ReactNode }) => {
	// получить из куки jwt:
	// const jwt = Cookies.get('access_token')

	// поллучить из localStorage jwt:
	// const jwt = localStorage.getItem('access_token')

	const jwt = useSelector((s: RootState) => s.user.access_token)

	//! в дальнейшем его нужно будет провалидировать, а не просто посмотреть, что он есть
	if (!jwt) {
		// replace-заменяет текущий путь
		return <Navigate to='/auth/login' replace />
	}
	//
	return children
}
