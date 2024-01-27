import { Document, Schema, model } from 'mongoose'

interface IProduct extends Document {
	title: string
	description: string
	image: string
	price: number
}

const ProductSchema: Schema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	}
})

const Product = model<IProduct>('Product', ProductSchema)

export default Product
