require('dotenv').config()
const http = require('http')
const { app } = require('./app')
require('./utils/db/mongoose')

const port = process.env.PORT || 5991

const server = http.createServer(app)

server.listen(port, () => console.log(`Server listening on port ${port}`))
