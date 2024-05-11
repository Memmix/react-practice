const getUsers = async () => {
	try {
		const result = await fetch('http://localhost:3000/users')
		const data = await result.json()
		return data
	} catch (err) {
		console.error(err)
	}
}

export default getUsers
