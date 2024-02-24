import { Document, Schema, Types, model } from 'mongoose'
import { IProduct } from './ProductModel'

export interface ICartItem {
	product: IProduct['_id']
	count: number
}

export interface ICart extends Document {
	items: ICartItem[]
}

const CartSchema = new Schema({
	items: [
		{
			product: {
				type: Types.ObjectId,
				ref: 'Product'
			},
			count: Number
		}
	]
})

const Cart = model<ICart>('Cart', CartSchema)

export default Cart
