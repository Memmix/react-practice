import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import Cart, { ICartItem } from '../models/CartModel'
import Product from '../models/ProductModel'
import User from '../models/UserModel'

interface Idecoded {
	id: string
	email: string
}

export const getCartByUserId = async (req: Request, res: Response) => {
	try {
		const token = req.headers.authorization?.split(' ')[1]
		const { userId } = req.params

		if (!token) {
			console.log('token not found')
			return res.status(401).send('Unauthorized')
		}

		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET_KEY as string
		) as Idecoded

		if (decoded.id !== userId) {
			console.log('user id is not equal')
			return res.status(403).send('Forbidden')
		}

		const user = await User.findOne({ _id: decoded.id })

		if (!user) {
			console.log('user not found')
			return res.status(404).send('User not found')
		}

		const cart = await Cart.findOne({ _id: user.cart })

		if (!cart) {
			console.log('cart not found')
			return res.status(404).send('Cart not found')
		}

		res.send(cart.items)
	} catch (err) {
		console.error('Error in getCartByUserId:', err)
		res.status(500).json({
			status: 500,
			success: false,
			message:
				err instanceof Error
					? err.message.toString()
					: 'Something went wrong on the server'
		})
	}
}

export const addProductToCart = async (req: Request, res: Response) => {
	try {
		const token = req.headers.authorization?.split(' ')[1]
		const { option, userId, productId, count } = req.body

		if (!token) {
			console.log('not a valid token')
			return res.status(401).send('Unauthorized')
		}

		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET_KEY as string
		) as Idecoded

		if (decoded.id !== userId) {
			console.log('user id is not equal')
			return res.status(403).send('Forbidden')
		}

		const user = await User.findOne({ _id: decoded.id })

		if (!user) {
			console.log('user not found')
			return res.status(404).send('User not found')
		}

		const cart = await Cart.findOne({ _id: user.cart })

		if (!cart) {
			console.log('no cart')
			return res.status(404).send('Cart not found')
		}

		const product = await Product.findById(productId)

		if (!product) {
			console.log('no product')
			return res.status(404).send('Product not found')
		}

		const existingProduct = cart.items.find(
			item => String(item.product) === String(product._id)
		)

		if (!existingProduct) {
			// If the product is not in the cart, add a new one
			const newProduct: ICartItem = {
				product: product._id,
				count: count
			}
			cart.items.push(newProduct)
		} else {
			// If the product is already in the cart, update the quantity based on the option
			if (option === 'add') {
				existingProduct.count += count
			}
			if (option === 'minus') {
				existingProduct.count -= count
				if (existingProduct.count === 0) {
					cart.items = cart.items.filter(
						item => String(item.product) !== String(product._id)
					)
				}
			}
			if (option === 'change') {
				existingProduct.count = count
			}
			if (option === 'remove') {
				cart.items = cart.items.filter(
					item => String(item.product) !== String(product._id)
				)
			}
		}

		await cart.save()
		res.send(cart.items)
	} catch (err) {
		console.log(err)
		res.status(500).send('Internal Server Error')
	}
}
