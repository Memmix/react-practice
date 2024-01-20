import React from 'react'
import ReactDOM from 'react-dom/client'
// импортируем компоненты маршрутизации из React Router DOM
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { Layout } from './layout/Menu/Layout'
import { Cart } from './pages/Cart/Cart'
import { Error } from './pages/Error'
import { Menu } from './pages/Menu/Menu'
import { Product } from './pages/Product/Product'

// создаем маршрутизатор
const router = createBrowserRouter([
	{
		path: '/', // базовый роут
		element: <Layout />, // отображаем Layout
		children: [
			// дочерние роуты
			{
				path: '/cart', // путь к корзине
				element: <Cart /> // отображаем Cart
			},
			{
				path: '/menu', // путь к меню
				element: <Menu /> // отображаем Menu
			},
			// параметрический роут
			{
				path: '/product/:id',
				element: <Product />
			}
		]
	},
	{
		path: '/*', // любой несуществующий путь
		element: <Error /> // показываем ошибку
	}
])

// Создаем корневой элемент в DOM с id="root"
ReactDOM.createRoot(document.getElementById('root')!).render(
	// Используем StrictMode для выявления потенциальных проблем
	<React.StrictMode>
		{/* Отображаем компонент RouterProvider, передавая ему роутер для
		навигации */}
		<RouterProvider router={router} />
	</React.StrictMode>
)
