const express = require('express')
const dotenv = require('dotenv').config()
const port = 5001
const { connectDB } = require('./config/db')

const app = express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended : false }))

app.use('/user', require('./routes/userRoutes'))
app.use('/streak', require('./routes/streakRoutes'))

app.listen(port, () => console.log(`Server started on port ${port}`))