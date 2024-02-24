import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { PREFIX } from '../helpers/API'
import { loadState } from './storage'
import { IUserState } from './user.slice'

export interface ICartProduct {
	product: string
	count: number
}

export interface ICartState {
	products: ICartProduct[]
}

const initialState: ICartState = {
	products: []
}

// Получение корзины для текущего пользователя из БД
export const getCartFromDB = createAsyncThunk(
	'cart/getCartFromDB',
	async (userId: string) => {
		try {
			// ! убрать id
			const { data } = await axios.get(`${PREFIX}/cart/get/${userId}`, {
				headers: {
					Authorization: `Bearer ${
						loadState<IUserState>('userData')?.access_token
					}`
				}
			})
			return data
		} catch (error) {
			console.error('Error in getCartFromDB:', error)
			throw error
		}
	}
)

// ! убрать id
export const editProductsInCart = createAsyncThunk(
	'cart/editProductsInCart',
	async ({
		option,
		userId,
		productId,
		count
	}: {
		option: string
		userId: string | undefined
		productId: string | undefined
		count: number
	}) => {
		try {
			const userAccessToken = loadState<IUserState>('userData')?.access_token
			if (!userAccessToken) {
				console.error('Токен пользователя отсутствует')
				return
			}
			axios.post(
				`${PREFIX}/cart/add/`,
				{
					option,
					userId: userId,
					productId: productId,
					count: count
				},
				{
					headers: {
						Authorization: `Bearer ${userAccessToken}`
					}
				}
			)
			// return data
		} catch (error) {
			console.error('Error in addCartToBD:', error)
			throw error
		}
	}
)

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		add: (state, action: PayloadAction<string>) => {
			const existedProduct = state.products.find(
				el => el.product === action.payload
			)
			if (!existedProduct) {
				state.products.push({ product: action.payload, count: 1 })
				return
			}
			existedProduct.count += 1
		},
		minus: (state, action: PayloadAction<string>) => {
			const existedProduct = state.products.find(
				el => el.product === action.payload
			)
			if (existedProduct) {
				existedProduct.count -= 1
				if (existedProduct.count === 0) {
					state.products = state.products.filter(
						el => el.product !== action.payload
					)
				}
			}
		},
		change: (
			state,
			action: PayloadAction<{ product: string; count: number }>
		) => {
			const { product, count } = action.payload
			const existingProduct = state.products.find(el => el.product === product)

			if (existingProduct) {
				existingProduct.count = count <= 0 ? 1 : count
			}
		},
		remove: (state, action: PayloadAction<string>) => {
			state.products = state.products.filter(
				el => el.product !== action.payload
			)
		}
	},
	extraReducers: builder => {
		builder.addCase(getCartFromDB.fulfilled, (state, action) => {
			state.products = action.payload
			return
		})
		builder.addCase(getCartFromDB.rejected, (state, action) => {
			state.products = []
			console.log('ошибка получения корзины:', action.error)
			return
		})
		builder.addCase(editProductsInCart.fulfilled, state => {
			console.log('товары в корзине успешно синхронизированы с БД')
			return state
		})
		// builder.addCase(addCartToBD.rejected, (_, action) => {
		// 	console.log('ошибка добавления товаров в корзину:', action.error)
		// 	return
		// })
	}
})

export default cartSlice.reducer
export const cartActions = cartSlice.actions
