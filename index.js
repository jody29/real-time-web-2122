require('dotenv').config()
const express = require('express')
const http = require('http')
const PORT = process.env.PORT || 5500
const bodyParser = require('body-parser')
const path = require('path')
const fetch = require('node-fetch')

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
const randomSortedMovieData = require('./src/modules/randomMovie.js') // function to get a random movie
let movie = {}

// socket connection
io.on('connection', (socket) => {

    socket.on('user connected', username => {
        users.push({
            username: username,
            score: 0,
            id: socket.id
        })

        if (users.length >= 4) {
            randomSortedMovieData()
            .then(async data => {
                console.log(data)
                movie = await data
                io.emit('new game', data)
                io.emit('new user', (users))
            })
        } else {
            io.emit('new user', (users))
        }
    })

    socket.on('new movie', () => {
        randomSortedMovieData()
        .then(data => {
            console.log(data)
            movie = data
            io.emit('random movie', data)
        })
    })

    socket.on('new message', data => {
        if (movie) {
            if (data.message === movie.title.toLowerCase()) {
                let rightUser = users.find(object => object.username === data.username)

                rightUser.score = rightUser.score + 10

                users.sort((a, b) => b.score - a.score)

                io.emit('new user', (users))

                if (users[0].score == 100) {
                    io.emit('end game', (users))
                } else {
                    randomSortedMovieData()
                    .then(async res => {
                    console.log(res)
                    movie = await res
                    io.emit('good guess', {
                        movie: res,
                        username: data.username
                    })
                })

                }
            } else {
                io.emit('message', {
                    username: data.username,
                    message: data.message
                })
            }
        }
    }) 

    socket.on('disconnect', username => {
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





