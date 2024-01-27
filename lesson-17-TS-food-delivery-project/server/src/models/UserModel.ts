import { Document, Schema, model } from 'mongoose'

interface IUser extends Document {
	login: string
	email: string
	password: string
}

const UserSchema: Schema = new Schema({
	// _id можно пока не указывать, потому что он автоматически создается
	// логин в данный момент не используется
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
	}
})

const User = model<IUser>('User', UserSchema)

export default User
