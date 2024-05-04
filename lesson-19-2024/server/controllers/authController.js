const bcrypt = require('bcrypt')
const User = require('../models/Auth_Users.model')

// РЕГИСТРАЦИЯ
const register = async (req, res) => {
	const { username, password } = req.body

	const saltRounds = 10
	const salt = await bcrypt.genSalt(saltRounds)
	const hash = await bcrypt.hash(password, salt)

	const user = new User({
		username,
		password: hash
	})

	try {
		await user.save()
		res.send({ message: 'Registration successful!' })
	} catch (err) {
		console.error(err)
		res.status(500).send({ message: 'Error regstering user!' })
	}
}

// АВТОРИЗАЦИЯ
const login = async (req, res) => {
	const { username, password } = req.body

	const user = await User.findOne({ username })
	if (!user)
		return res.status(400).send({ message: 'Invalid username or password' })

	const validPassword = await bcrypt.compare(password, user.password)
	if (!validPassword) {
		return res.status(400).send({ message: 'Invalid username or password' })
	}

	res.send({ message: 'Login successful!' })
}

module.exports = {
	register,
	login
}
