const socket = io()
const leaveRoom = document.querySelector('#leave')
const userList = document.querySelector('#userList')
const newMovie = document.querySelector('.newMovie')
const movieCont = document.querySelector('#moviePoster')
const chatForm = document.querySelector('#chatForm')
const message = document.querySelector('#message')
const chatBox = document.querySelector('#chatBox')
const joinedUsers = document.querySelector('#joined')
const userNeed = document.querySelector('#userNeed')
const queue = document.querySelector('#queue')
const timerCont = document.querySelector('#timer')

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
    joinedUsers.innerHTML = ''

    let usersNeeded = 2 - users.length

    users.forEach(user => {
        let userItem = document.createElement('li')

        userItem.textContent = user.username

        if (user.username === username) {
            userItem.classList.add('joinedUser')
        }

        joinedUsers.appendChild(userItem)
    })

    userNeed.textContent = `${usersNeeded} more user(s) needed to start the game.`

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

socket.on('new game', movie => {
    queue.classList.add('hidden')

    timerCont.textContent = ''
    movieCont.innerHTML = ''

    const img = document.createElement('img')

    img.src = `https://image.tmdb.org/t/p/w400${movie.backdrop_path}`
    img.alt = `poster of random movie`

    movieCont.appendChild(img)

    let timeLeft = 30
    let timer = setInterval(function() {
        if(timeLeft < 1) {
            clearInterval(timer)
            socket.emit('new movie')
        }
        timerCont.textContent = timeLeft
        timeLeft -= 1
    }, 1000)
})

socket.on('random movie', movie => {
    timerCont.textContent = ''
    movieCont.innerHTML = ''

    const img = document.createElement('img')

    img.src = `https://image.tmdb.org/t/p/w400${movie.backdrop_path}`
    img.alt = `poster of random movie`

    movieCont.appendChild(img)

    let timeLeft = 30
    let timer = setInterval(() => {
        if(timeLeft < 1) {
            clearInterval(timer)
            socket.emit('new movie')
        }
        timerCont.textContent = timeLeft
        timeLeft -= 1
    }, 1000)
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

    img.src = `https://image.tmdb.org/t/p/w400${data.movie.backdrop_path}`
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

    clearInterval(timer)

    let timeLeft = 30
    let timer = setInterval(function() {
        if(timeLeft < 1) {
            clearInterval(timer)
            socket.emit('new movie')
        }
        timerCont.textContent = timeLeft
        timeLeft -= 1
    }, 1000)
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

leaveRoom.addEventListener('click', () => {
    socket.emit('disconnect', username)
})