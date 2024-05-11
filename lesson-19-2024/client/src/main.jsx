import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Auth from './components/auth/Auth.jsx'
import Login from './components/auth/Login.jsx'
import Register from './components/auth/Register.jsx'
import PageNotFound from './components/PageNotFound.jsx'
import Test from './components/Test.jsx'
import RequireAuth from './helpers/RequireAuth.jsx'
import './index.css'

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<RequireAuth>
				<App />
			</RequireAuth>
		)
	},
	{
		path: '/test',
		element: <Test />
	},
	{
		path: '/auth',
		element: <Auth />,
		children: [
			{
				path: 'login',
				element: <Login />
			},
			{
				path: 'register',
				element: <Register />
			}
		]
	},
	{
		path: '*',
		element: <PageNotFound />
	}
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
