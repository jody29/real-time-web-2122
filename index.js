require('dotenv').config()
const express = require('express')
const http = require('http')
const PORT = process.env.PORT || 5500
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

const homeRouter = require('./src/routers/homeRouter.js')

// express setup
app
.set('view engine', 'ejs')
.set('views', path.join(__dirname, 'src/views'))
.use(express.static(__dirname + '/public'))
.use(bodyParser.urlencoded({ extended: true }))
.use('/', homeRouter)

let users = []

// socket connection
io.on('connection', async (socket) => {
    socket.on('user connected', username => {
        users.push({
            username: username,
            score: 0,
            id: socket.id
        })

        io.emit('new user', (users))
    })

    socket.on('user disconnected', username => {
        let name = ''

        users.forEach(user => {
            if (user.id === socket.id) {
                name = username

                users = users.filter(user => user.id != socket.id)
            }
        })

        io.emit('new user', (users))
    })
})

server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})





