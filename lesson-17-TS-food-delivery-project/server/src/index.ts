import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Application } from 'express'
import { connect } from 'mongoose'
import router from './router/router'
import bodyParser = require('body-parser')

const allowedOrigins = ['http://localhost:5173', 'https://localhost:3001']

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
// роутер
app.use('/', router)

async function start() {
	try {
		connect(process.env.MONGO_URI!)
		console.log('MONGO_DB connection successful')
	} catch (error) {
		console.log('Error connecting to MongoDB:', error)
	}

	// port listening
	app.listen(port, () => {
		console.log(`Server is Fire at http://localhost:${port}`)
	})
}

start()
