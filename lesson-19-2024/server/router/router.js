const express = require('express')
const { getAllUsers, addNewUser } = require('../controllers/usersController')
const { register, login } = require('../controllers/authController')

const router = express.Router()

// роуты работы с пользователями
router.get('/users', getAllUsers)
router.post('/adduser', addNewUser)

// роуты аутентификации
router.post('/register', register)
router.post('/login', login)

module.exports = router
