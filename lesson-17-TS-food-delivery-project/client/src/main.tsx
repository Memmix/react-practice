import axios from 'axios'
import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, defer, RouterProvider } from 'react-router-dom'
import { PREFIX } from './helpers/API'
import './index.css'
import { MenuLayout } from './layout/Menu/MenuLayout'
import { Cart } from './pages/Cart/Cart'
import { Error } from './pages/Error'
// import { Menu } from './pages/Menu/Menu'
import { Provider } from 'react-redux'
import { RequireAuth } from './helpers/RequireAuth'
import { AuthLayout } from './layout/Auth/AuthLayout'
import { Login } from './pages/Login/Login'
import { Product } from './pages/Product/Product'
import { Register } from './pages/Register/Register'
import { store } from './store/store'

// используем ленивую загрузку
// в конце обязательно export component

// 1 вариант (export default в Menu)
// const Menu = lazy(() => import('./pages/Menu/Menu'))
// 2 вариант:
const Menu = lazy(() =>
	import('./pages/Menu/Menu').then(module => ({ default: module.Menu }))
)

// создаем маршрутизатор
const router = createBrowserRouter([
	{
		path: '/', // базовый роут
		element: (
			<RequireAuth>
				<MenuLayout />
			</RequireAuth>
		), // отображаем Layout
		children: [
			// дочерние роуты
			{
				path: '/cart', // путь к корзине
				element: <Cart /> // отображаем Cart
			},
			{
				path: '/menu', // путь к меню
				element: (
					<Suspense fallback={<div>Загрузка...</div>}>
						<Menu />
					</Suspense>
				) // отображаем Menu
			},
			// параметрический роут
			{
				path: '/product/:id',
				element: <Product />,

				// обработка ошибок при переходе по роуту
				errorElement: <>Ошибка</>,
				// использование loader + defer
				loader: async ({ params }) => {
					// defer используется для отложенной загрузки данных для компонента маршрута, позволяет отложить загрузку данных до момента отрисовки компонента маршрута.
					// defer возвращает объект loaderData, который затем передается в компонент маршрута через пропсы.
					// Благодаря этому в компоненте маршрута уже есть загруженные данные для отрисовки. Не нужно делать запросы в самом компоненте.
					// Можно показывать fallback контент пока идет загрузка в defer.
					return defer({
						data: axios
							.get(`${PREFIX}/products/${params.id}`, {
								withCredentials: true
							})
							.then(data => data)
					})

					// // имитация загрузки
					// await new Promise(resolve => setTimeout(resolve, 1500))
					// // получение данных из API, используя params
					// const { data } = await axios.get(`${PREFIX}/products/${params.id}`)
					// return data
				}
			}
		]
	},
	{
		path: '/auth',
		element: <AuthLayout />,
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
		path: '/*', // любой несуществующий путь
		element: <Error /> // показываем ошибку
	}
])

// Создаем корневой элемент в DOM с id="root"
ReactDOM.createRoot(document.getElementById('root')!).render(
	// Используем StrictMode для выявления потенциальных проблем
	<React.StrictMode>
		{/* используем Provider ReduxToolkit */}
		<Provider store={store}>
			{/* Отображаем компонент RouterProvider, передавая ему роутер для
		навигации */}
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
)

export default Menu
