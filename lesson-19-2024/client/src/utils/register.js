const register = data => {
	return new Promise((resolve, reject) => {
		fetch('http://localhost:3000/register', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		})
			.then(response => response.json())
			.then(json => {
				resolve(json)
			})
			.catch(error => reject(error))
	})
}

export default register
