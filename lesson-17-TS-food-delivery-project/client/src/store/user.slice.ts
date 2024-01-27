import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { loadState } from './storage'

// !IUserPersistenState ext...in

// этот интерфейс описывает структуру данных внутри нашего slice
export interface IUserState {
	access_token: string | null
}

// начальное состояние нашего slice
const initialState: IUserState = {
	access_token: loadState<IUserState>('userData')?.access_token ?? null
}

// с помощью createSlice() создаётся slice с именем "user", начальным состоянием initialState и двумя reducer функциями:

// addToken - для добавления token
// logout - для сброса token в null
export const userSlice = createSlice({
	name: 'user',
	initialState,
	// state - предыдущее состояние
	// action - действие, которое произошло (сюда можно передать что-то полезное, а также указать тип передаваемых данных в дженерике)
	reducers: {
		addToken: (state, action: PayloadAction<string>) => {
			state.access_token = action.payload
		},
		logout: state => {
			state.access_token = null
		}
	}
})

export default userSlice.reducer
export const userActions = userSlice.actions
