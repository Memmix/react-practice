import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { Layout } from './layout/Menu/Layout'
import { Cart } from './pages/Cart'
import { Error } from './pages/Error'
import { Menu } from './pages/Menu'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/cart',
				element: <Cart />
			},
			{
				path: '/menu',
				element: <Menu />
			}
		]
	},
	{
		path: '/*',
		element: <Error />
	}
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
