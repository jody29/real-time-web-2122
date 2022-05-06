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
const gameCont = document.querySelector('#room')

const urlParams = new URLSearchParams(window.location.search)
const username = urlParams.get('username')

const hiddenName = document.createElement('input')
hiddenName.type = 'hidden'
hiddenName.id = 'username'
hiddenName.value = username

chatForm.appendChild(hiddenName)

socket.emit('user connected', username)

socket.on('new user', users => {
    timerCont.textContent = ''
    userList.innerHTML = ''
    joinedUsers.innerHTML = ''

    let usersNeeded = 4 - users.length

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

    let timeLeft = 30
    let timer = setInterval(function() {
        if(timeLeft < 1) {
            clearInterval(timer)
            socket.emit('new movie')
        }

        socket.on('new user', users => {
            clearInterval(timer)
        })

        socket.on('good guess', data => {
            clearInterval(timer)
        })

        socket.on('random movie', movie => {
            clearInterval(timer)
        })

        timerCont.classList.remove('hidden')
        timerCont.textContent = timeLeft
        timeLeft -= 1
    }, 1000)
})

socket.on('end game', (users) => {
    gameCont.innerHTML = ''

    const rankingCont = document.createElement('article')
    rankingCont.id = 'rankingCont'

    gameCont.appendChild(rankingCont)

    const rankingSect = document.createElement('section')
    rankingSect.id = 'rankingSect'

    rankingCont.appendChild(rankingSect)

    const winner = document.createElement('h2')
    winner.textContent = `${users[0].username} is the winner!`
    rankingSect.appendChild(winner)

    const finalRanking = document.createElement('ul')
    finalRanking.classList.add('finalRanking')

    users.forEach(user => {
        const rankItem = document.createElement('li')

        if (user.username === username) {
            rankItem.classList.add('currentUser')
        }

        rankItem.textContent = `${user.username}: ${user.score}`

        finalRanking.appendChild(rankItem)
    })

    rankingSect.appendChild(finalRanking)

    const leave = document.createElement('a')
    leave.href = '/'
    leave.id = 'leave'

    const leaveImg = document.createElement('img')
    leaveImg.src = '/assets/exit.svg'

    leave.appendChild(leaveImg)

    rankingSect.appendChild(leave)

    leave.addEventListener('click', () => {
        socket.emit('disconnect', username)
    })
})

socket.on('new game', movie => {
    queue.classList.add('hidden')
    timerCont.classList.add('hidden')

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

        socket.on('new user', users => {
            clearInterval(timer)
        })

        socket.on('good guess', data => {
            clearInterval(timer)
        })

        socket.on('random movie', movie => {
            clearInterval(timer)
        })

        timerCont.classList.remove('hidden')
        timerCont.textContent = timeLeft
        timeLeft -= 1
    }, 1000)
})

socket.on('random movie', movie => {
    timerCont.textContent = ''
    movieCont.innerHTML = ''
    timerCont.classList.add('hidden')

    const img = document.createElement('img')

    img.src = `https://image.tmdb.org/t/p/w400${movie.backdrop_path}`
    img.alt = `poster of random movie`

    movieCont.appendChild(img)

    let timeLeft = 30
    let timer = setInterval(function() {
        if(timeLeft < 1) {
            clearInterval(timer)
        }

        if(timeLeft == 0) {
            socket.emit('new movie')
        }

        socket.on('new user', users => {
            clearInterval(timer)
        })

        socket.on('good guess', data => {
            clearInterval(timer)
        })

        socket.on('random movie', movie => {
            clearInterval(timer)
        })

        timerCont.classList.remove('hidden')
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
    timerCont.classList.add('hidden')
    timerCont.textContent = ''
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

    let timeLeft = 30
    let timer = setInterval(function() {
        if(timeLeft < 1) {
            clearInterval(timer)
            socket.emit('new movie')
        }

        socket.on('new user', users => {
            clearInterval(timer)
        })

        socket.on('good guess', data => {
            clearInterval(timer)
        })

        socket.on('random movie', movie => {
            clearInterval(timer)
        })

        timerCont.classList.remove('hidden')
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