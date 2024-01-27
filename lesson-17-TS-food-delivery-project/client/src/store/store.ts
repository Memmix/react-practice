import { configureStore } from '@reduxjs/toolkit'
import { saveState } from './storage'
import userSlice from './user.slice'

// создаём корневой store, к которому будут добавлены отдельный кусочки(slice)
// конфигурируем его. В нём будут все наши reducer's
// reducer - функция, которая будет изменять состояния
// внутри и хранятся различные слайсы
export const store = configureStore({
	reducer: {
		user: userSlice
	}
})

// методы store которые сейчас доступны:
// 1. store.dispatch - обеспечивает отправку какого-либо изменения с каким-то action в store
// 2. store.getState - получение состояния
// 3. store.replaceReducer - замена какого-то reducer
// 4. store.subscribe - подписаться на изменения какого-то reducer

// когда у нас меняется jwt токен мы должны его синхронизировать с localstorage:
store.subscribe(() => {
	saveState({ access_token: store.getState().user.access_token }, 'userData')
})

// получаем типы корневого состояния нашего store
export type RootState = ReturnType<typeof store.getState>
// получаем типы действий, которые мы можем совершать
export type AppDispatch = typeof store.dispatch
