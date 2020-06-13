const express = require('express')

const userRouter = require('./api/routes/user')
const taskRouter = require('./api/routes/task')

const app = express()
app.use(express.json())

// ROUTES
app.use(userRouter)
app.use(taskRouter)

module.exports = { app}
