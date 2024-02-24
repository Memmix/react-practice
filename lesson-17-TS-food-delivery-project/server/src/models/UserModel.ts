import { Document, Schema, Types, model } from 'mongoose'
import Cart, { ICart } from './CartModel'

export interface IUser extends Document {
	login: string
	email: string
	password: string
	cart: Types.ObjectId | ICart
}

const UserSchema: Schema = new Schema({
	login: {
		type: String,
		required: false
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	cart: {
		type: Types.ObjectId,
		ref: 'Cart'
	}
})

UserSchema.pre('save', async function (next) {
	// Создаем новую корзину и привязываем ее к пользователю
	const newCart = new Cart({ items: [] })
	await newCart.save()
	this.cart = newCart._id

	// Продолжаем сохранение пользователя
	next()
})

const User = model<IUser>('User', UserSchema)

export default User
