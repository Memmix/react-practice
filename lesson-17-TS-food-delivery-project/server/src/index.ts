import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Application, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { connect } from 'mongoose'
import Product from './models/ProductModel'
import User from './models/UserModel'
import bodyParser = require('body-parser')

const allowedOrigins = ['http://localhost:5173']

dotenv.config()
const app: Application = express()
const port = process.env.PORT || 8000

app.use(bodyParser.json())
app.use(cookieParser())
app.use(
	cors({
		origin: allowedOrigins,
		credentials: true
	})
)

async function start() {
	// mongoDB connection
	try {
		connect(process.env.MONGO_URI!)
		console.log('MONGO_DB connection successful')
	} catch (error) {
		console.log('Error connecting to MongoDB:', error)
	}

	// jwt ----------------------
	// register
	app.post('/auth/register', async (req: Request, res: Response) => {
		try {
			// получаем данные из тела запроса + деструктурируем их
			const { login, email, password } = req.body
			// проверяем есть ли такой email в БД
			const isEmailAllreadyExist = await User.findOne({ email })
			// если есть, то возвращаем соответствующий ответ от сервера с кодом 400
			if (isEmailAllreadyExist) {
				res.status(400).json({
					status: 400,
					message: 'This email is allready exist'
				})
				return
			}

			// если пользователя с таким email нет, создаём и сохраняем в БД
			// хешируем пароль
			bcrypt.hash(password, 10, async (err, hash) => {
				if (err) throw err
				// сохраняем в БД
				const newUser = await User.create({ login, email, password: hash })
				// отправляем ответ от сервера с кодом 200 и данными пользователя
				res.status(200).json({
					status: 201,
					success: true,
					message: 'User created',
					newUser
				})
			})
		} catch (err) {
			console.error(err)
			// Отправляем сообщение с ошибкой пользователю
			res.json({
				status: 400,
				message:
					err instanceof Error
						? err.message.toString()
						: 'something went wrong on server'
			})
		}
	})

	// login
	app.post('/auth/login', async (req: Request, res: Response) => {
		try {
			// получаем данные из тела запроса
			const { email, password } = req.body
			// проверяем есть ли пользователь с таким email в БД
			const user = await User.findOne({ email })
			// если пользователь есть:
			if (user) {
				// нужно проверить валидный ли пароль введён
				const isPasswordMatched = await bcrypt.compare(password, user.password)
				// если не совпадают - сообщим пользователю об этом
				if (!isPasswordMatched) {
					res.json({
						status: 400,
						success: false,
						message: 'Incorrect password'
					})
					return
				}
			}
			// если такого пользователя нет, то возвращаем соответствующий ответ от сервера с кодом 404
			else {
				res.json({
					status: 404,
					success: false,
					message: 'User not found'
				})
				return
			}
			// если пользователь найден, а пароль валиден, то генерируем jwt-token
			// payload - это данные, которые будут внутри jwt-токена
			// secret key - это ключ, который будет использоваться для шифрования и дешифрования (в .env)
			// expiration - это время жизни токена и выбранный алгоритм
			const access_token = jwt.sign(
				{ id: user._id, email: user.email },
				process.env.JWT_SECRET_KEY as string,
				{
					expiresIn: '1h'
				}
			)

			//? вариант использования
			// 1. отправляем куки с токеном на клиент
			// res.cookie('access_token', access_token, {
			// 	httpOnly: true,
			// 	secure: false, // true if https
			// 	sameSite: 'none' // 'none' для кросс-доменных куки
			// })

			// 2. отправляем пользователю ответ от сервера со всей инфой, включая токен:
			res.json({
				status: 200,
				success: true,
				message: 'User logged in',
				access_token
			})
		} catch (err) {
			res.json({
				status: 400,
				success: false,
				message:
					err instanceof Error
						? err.message.toString()
						: 'Something went wrong on server'
			})
		}
	})

	// routes -------------
	// get all products
	app.get('/products', async (req: Request, res: Response) => {
		try {
			const data = await Product.find({})
			res.send(data)
		} catch (err) {
			console.error(err)
		}
	})

	// get product by id
	app.get('/products/:id', async (req: Request, res: Response) => {
		try {
			const data = await Product.findById(req.params.id)
			res.send(data)
		} catch (err) {
			console.error(err)
		}
	})

	// port listening
	app.listen(port, () => {
		console.log(`Server is Fire at http://localhost:${port}`)
	})
}

start()
