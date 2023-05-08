const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  salt: {
    type: String,
  }
})

const User = mongoose.model('users', userSchema)

const db = 'ВАШЕ ПОДКЛЮЧЕНИЕ К MongoDB!'

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => { console.log('connected to DB') })
  .catch(error => { console.log(error) })

const app = express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// !----------------GET----------------!
app.get('/api/users', async (req, res) => {
  const users = await User.find()
  res.json(users)
})

// !----------------POST----------------!
// BCRYPT
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body

  const user = new User({
    username,
    password,
    salt: "test",
  });

  try {
    await user.save();
    res.send(JSON.stringify('Registration successful!'))
  } catch (err) {
    console.error(err)
    res.status(500).send(JSON.stringify('Error registering user'))
  }
});

app.listen(3002, () => console.log('server started'))