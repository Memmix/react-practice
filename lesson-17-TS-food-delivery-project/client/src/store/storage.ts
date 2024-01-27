// функция чтения
export function loadState<T>(key: string): T | undefined {
	try {
		const jsonState = localStorage.getItem(key)
		if (!jsonState) {
			return undefined
		}
		return JSON.parse(jsonState)
	} catch (err) {
		if (err instanceof Error) {
			console.error('Error loading state:', err.message)
			return undefined
		}
	}
}

export function saveState<T>(state: T, key: string) {
	const stringState = JSON.stringify(state)
	localStorage.setItem(key, stringState)
}
