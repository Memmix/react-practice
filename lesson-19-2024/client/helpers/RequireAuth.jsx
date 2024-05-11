import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'

function RequireAuth({ children }) {
	// jwt = Cookies.get('access_token')
	const user = localStorage.getItem('user')

	return (
		<>
			{user ? children : <Navigate to='/auth/login' replace />}
			{/* {user} && {children} || !{user} && <Navigate to='/auth/login' replace /> */}
		</>
	)
}

RequireAuth.propTypes = {
	children: PropTypes.node
}

export default RequireAuth
