const socket = io()
const leaveRoom = document.querySelector('#leave')
const userList = document.querySelector('#userList')
const newMovie = document.querySelector('.newMovie')
const movieCont = document.querySelector('#moviePoster')
const chatForm = document.querySelector('#chatForm')
const message = document.querySelector('#message')
const chatBox = document.querySelector('#chatBox')
const joinedUsers = document.querySelector('#joined')

const urlParams = new URLSearchParams(window.location.search)
const username = urlParams.get('username')

const hiddenName = document.createElement('input')
hiddenName.type = 'hidden'
hiddenName.id = 'username'
hiddenName.value = username

chatForm.appendChild(hiddenName)

socket.emit('user connected', username)

socket.on('new user', users => {
    userList.innerHTML = ''

    users.forEach(user => {
        let userItem = document.createElement('li')

        userItem.textContent = user.username

        if (user.username === username) {
            userItem.classList.add('joinedUser')
        }

        joinedUsers.appendChild(userItem)
    })

    users.splice(3)

    users.forEach(user => {

        let userItem = document.createElement('li')

        userItem.textContent = `${user.username}: ${user.score}`

        if (user.username === username) {
            userItem.classList.add('currentUser')
        }

        userList.appendChild(userItem)
    })
})

socket.on('random movie', movie => {
    movieCont.innerHTML = ''

    currentMovie = movie.title.toLowerCase()

    const img = document.createElement('img')

    img.src = `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
    img.alt = `poster of random movie`

    movieCont.appendChild(img)
})

socket.on('message', data => {
    const mesEl = document.createElement('li')

    if (data.username === username) {
        mesEl.classList.add('outgoing')
        mesEl.innerHTML = `
        <span>You</span>
        <span>${data.message}</span>
        `
    } else {
        mesEl.classList.add('incoming')
        mesEl.innerHTML = `
        <span>${data.username}</span>
        <span>${data.message}</span>
        `
    }

    chatBox.appendChild(mesEl)
    chatBox.scrollTop = chatBox.scrollHeight
})

socket.on('good guess', data => {
    movieCont.innerHTML = '' 

    const img = document.createElement('img')
    const mesEl = document.createElement('li')

    img.src = `https://image.tmdb.org/t/p/w500/${data.movie.backdrop_path}`
    img.alt = `poster of random movie`


    if (data.username === username) {
        mesEl.textContent = `You guessed the right movie!`
    } else {
        mesEl.textContent = `${data.username} guessed the right movie!`
    }
    
    mesEl.classList.add('notification')

    movieCont.appendChild(img)
    chatBox.appendChild(mesEl)

    chatBox.scrollTop = chatBox.scrollHeight
})

chatForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    if (message.value) {
        socket.emit('new message', {
            username: username,
            message: message.value.toLowerCase()
        })
    }
    message.value = ''
})

newMovie.addEventListener('click', () => {
    socket.emit('new movie')
})

leaveRoom.addEventListener('click', () => {
    socket.emit('disconnect', username)
})