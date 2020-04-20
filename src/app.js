require('dotenv').config();
const express = require('express');

// DB CONNECTION
require('./utils/db/mongoose');

// ROUTES
const userRouter = require('./api/routes/user');
const taskRouter = require('./api/routes/task');

const app = express();

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

module.exports = { app };
