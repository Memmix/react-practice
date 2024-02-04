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
			const { email, password } = req.body
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
				const newUser = await User.create({ email, password: hash })
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
			res.status(400).json({
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
			const { email, password } = req.body
			const user = await User.findOne({ email })

			if (user) {
				const isPasswordMatched = await bcrypt.compare(password, user.password)

				if (!isPasswordMatched) {
					return res.status(400).json({
						status: 400,
						success: false,
						message: 'Неверный пароль'
					})
				}
			} else {
				return res.status(404).json({
					status: 404,
					success: false,
					message: 'Пользователь не найден'
				})
			}

			const access_token = jwt.sign(
				{ id: user._id, email: user.email },
				process.env.JWT_SECRET_KEY as string,
				{
					expiresIn: '1h'
				}
			)

			res.json({
				status: 200,
				success: true,
				message: 'Пользователь вошел в систему',
				access_token
			})
		} catch (err) {
			res.status(400).json({
				status: 400,
				success: false,
				message:
					err instanceof Error
						? err.message.toString()
						: 'Что-то пошло не так на сервере'
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

	// get profile with bearer accesstoken
	app.get('/getProfile', async (req: Request, res: Response) => {
		interface Idecoded {
			id: string
			email: string
		}

		try {
			// убираем Bearer
			const token = req.headers.authorization?.split(' ')[1]
			if (token) {
				const decoded = jwt.verify(
					token,
					process.env.JWT_SECRET_KEY as string
				) as Idecoded // Уточнение типа

				const user = await User.findOne({ _id: decoded.id }) // Поиск по _id

				if (user) {
					res.send(user)
				} else {
					res.status(404).send({
						status: 404,
						message: 'User not found'
					})
				}
			}
		} catch (err) {
			console.error(err)
			res.status(400).send({
				status: 400,
				message: 'Invalid token'
			})
		}
	})

	// port listening
	app.listen(port, () => {
		console.log(`Server is Fire at http://localhost:${port}`)
	})
}

start()
