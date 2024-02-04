import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { PREFIX } from '../helpers/API'
import { ILoginResponse } from '../interfaces/auth.interface'
import { IProfile } from '../interfaces/user.interface'
import { loadState } from './storage'

// !IUserPersistenState ext...in

// этот интерфейс описывает структуру данных внутри нашего slice
export interface IUserState {
	access_token: string | null
	registerSuccess?: true | false
	registerErrorMessage?: string
	loginErrorMessage?: string
	profile?: IProfile
}

// начальное состояние нашего slice
const initialState: IUserState = {
	access_token: loadState<IUserState>('userData')?.access_token ?? null
}

// перенесем сюда функцию логина и обернем ее в createAsyncThunk, чтобы использовать асинхронно
export const login = createAsyncThunk(
	'user/login',
	async (params: { email: string; password: string }) => {
		try {
			const { data } = await axios.post<ILoginResponse>(
				`${PREFIX}/auth/login`,
				{
					email: params.email,
					password: params.password
				}
			)
			return data
		} catch (err) {
			if (err instanceof AxiosError) {
				throw new Error(err.response?.data.message)
			}
		}
	}
)

// функция регистрации
export const register = createAsyncThunk(
	'user/register',
	async (params: { email: string; password: string }) => {
		try {
			const { data } = await axios.post(`${PREFIX}/auth/register`, {
				email: params.email,
				password: params.password
			})
			console.log(data)
			return data
		} catch (err) {
			if (err instanceof AxiosError) {
				throw new Error(err.response?.data.message)
			}
		}
	}
)

// функция получения profile, с отправкой accesstoken
export const getProfile = createAsyncThunk('user/getProfile', async () => {
	try {
		const { data } = await axios.get<IProfile>(`${PREFIX}/getProfile`, {
			headers: {
				Authorization: `Bearer ${
					loadState<IUserState>('userData')?.access_token
				}`
			}
		})
		return data
	} catch (err) {
		if (err instanceof AxiosError) {
			throw new Error(err.response?.data.message)
		}
	}
})

// с помощью createSlice() создаётся slice с именем "user", начальным состоянием initialState и двумя reducer функциями:
// addToken - для добавления token
// logout - для сброса token в null
export const userSlice = createSlice({
	name: 'user',
	initialState,
	// reducers - функции, которые будут менять состояние в слайсе
	// state - предыдущее состояние
	// action - действие, которое произошло (сюда можно передать что-то полезное, а также указать тип передаваемых данных в дженерике)
	//
	reducers: {
		// addToken не нужен, поскольку у нас теперь есть loginThunk
		// addToken: (state, action: PayloadAction<string>) => {
		// 	state.access_token = action.payload
		// },
		logout: state => {
			state.access_token = null
			state.registerSuccess = undefined
		},
		clearLoginError: state => {
			state.loginErrorMessage = undefined
		},
		clearRegisterError: state => {
			state.registerErrorMessage = undefined
		}
	},
	extraReducers: builder => {
		//* jбработка fulfilled состояния промиса login
		builder.addCase(login.fulfilled, (state, action) => {
			if (!action.payload) {
				return
			}
			state.access_token = action.payload.access_token
		})
		//* обработка rejected промиса login
		builder.addCase(login.rejected, (state, action) => {
			console.log(action)
			state.loginErrorMessage = action.error.message
		})
		//* обработка fulfilled состояния промиса register
		builder.addCase(register.fulfilled, (state, action) => {
			if (!action.payload) {
				return
			}
			state.registerSuccess = true
		})
		//* обработка rejected промиса register
		builder.addCase(register.rejected, (state, action) => {
			console.log(action)
			state.registerErrorMessage = action.error.message
		})
		//* работа с profile
		builder.addCase(getProfile.fulfilled, (state, action) => {
			if (!action.payload) {
				return
			}
			state.profile = action.payload
		})
	}
})

export default userSlice.reducer
export const userActions = userSlice.actions
