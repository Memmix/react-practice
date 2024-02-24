import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import Product from '../models/ProductModel'
import User from '../models/UserModel'

// регистрация
export const registerUser = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body
		const isEmailAllreadyExist = await User.findOne({ email })
		if (isEmailAllreadyExist) {
			res.status(400).json({
				status: 400,
				message: 'This email is allready exist'
			})
			return
		}

		bcrypt.hash(password, 10, async (err, hash) => {
			if (err) throw err
			const newUser = await User.create({ email, password: hash })
			res.status(200).json({
				status: 201,
				success: true,
				message: 'User created',
				newUser
			})
		})
	} catch (err) {
		console.error(err)
		res.status(400).json({
			status: 400,
			message:
				err instanceof Error
					? err.message.toString()
					: 'something went wrong on server'
		})
	}
}

// авторизация
export const loginUser = async (req: Request, res: Response) => {
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
}

export const getAllProducts = async (req: Request, res: Response) => {
	try {
		const data = await Product.find({})
		res.send(data)
	} catch (err) {
		console.error(err)
	}
}

export const getProductById = async (req: Request, res: Response) => {
	try {
		const data = await Product.findById(req.params.id)
		res.send(data)
	} catch (err) {
		console.error(err)
	}
}

export const getProfile = async (req: Request, res: Response) => {
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
}
