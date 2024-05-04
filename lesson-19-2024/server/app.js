require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const router = require('./router/router')
const { default: mongoose } = require('mongoose')

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(cookieParser())

const allowedOrigins = ['http://localhost:5173']

app.use(
	cors({
		origin: allowedOrigins,
		credentials: true
	})
)

app.use(router)

mongoose.connect(process.env.MONGO_URI)

async function start() {
	app.listen(PORT, () => {
		console.log(`server started on: http://localhost:${PORT}`)
	})
}

start()
