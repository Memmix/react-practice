const fs = require('fs')

const getAllUsers = (req, res) => {
	try {
		const data = JSON.parse(fs.readFileSync('./db/users.json'))
		res.send(data)
	} catch (err) {
		res.send('Произошла ошибка при получении данных', err)
	}
}

const addNewUser = (req, res) => {
	try {
		const newUser = req.body
		const data = JSON.parse(fs.readFileSync('./db/users.json'))
		data.push(newUser)
		fs.writeFileSync('./db/users.json', JSON.stringify(data))
		res.send(`Пользователь ${newUser.name} успешно добавлен`)
	} catch (err) {
		res.send('Произошла ошибка при добавлении нового пользователя', err)
	}
}

module.exports = {
	getAllUsers,
	addNewUser
}
