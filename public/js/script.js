const socket = io() // connect with the server socket
const leaveRoom = document.querySelector('#leave') // button to leave
const userList = document.querySelector('#userList') // list of users
const movieCont = document.querySelector('#moviePoster') // container for the movie poster
const chatForm = document.querySelector('#chatForm') // form with input for the chat
const message = document.querySelector('#message') // input for the chat
const chatBox = document.querySelector('#chatBox') // container to show the messages
const joinedUsers = document.querySelector('#joined') // list for joined users
const userNeed = document.querySelector('#userNeed') // element that shows how much users are neeeded
const queue = document.querySelector('#queue') // list for the waiting queue
const timerCont = document.querySelector('#timer') // container for the timer
const gameCont = document.querySelector('#room') // main element of the game room

const urlParams = new URLSearchParams(window.location.search) // create a URLSearchParams that searches for parameters in the searchbar
const username = urlParams.get('username') // get the username parameter

socket.emit('user connected', username) // send the server socket the username of the client that has joined

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
    timerCont.classList.add('hidden') // timer should not be visible
    timerCont.textContent = '' // timer should be empty
    movieCont.innerHTML = '' // movie poster container needs to be empty

    const img = document.createElement('img') // create image element for the movie poster
    const mesEl = document.createElement('li') // create element for the messages

    img.src = `https://image.tmdb.org/t/p/w400${data.movie.backdrop_path}` // src for the image
    img.alt = `poster of random movie` // alt tag for the image

    if (data.username === username) { // if the username is the same as the current user
        mesEl.textContent = `You guessed the right movie!` // notification should be this
    } else { // else
        mesEl.textContent = `${data.username} guessed the right movie!` // notification should be this
    }
    
    mesEl.classList.add('notification') // message gets the class notification, so it gets the notifications styling

    movieCont.appendChild(img) // add the image element to the poster container
    chatBox.appendChild(mesEl) // add the message element to the chatbox

    chatBox.scrollTop = chatBox.scrollHeight // make sure that the user always sees the most recent messege

    let timeLeft = 30 // seconds of time the users get to guess the movie
    let timer = setInterval(function() { // create an interval
        if(timeLeft < 1) { // if the timeleft is under 1
            clearInterval(timer) // then stop the interval
            socket.emit('new movie') // and tell the server it needs a new random movie
        }

        socket.on('new user', users => { // when there is an new user
            clearInterval(timer) // stop the interval
        })

        socket.on('good guess', data => { // when someone guessed the movie
            clearInterval(timer) // stop the interval
        })

        socket.on('random movie', movie => { // when a new movie has been received
            clearInterval(timer) // stop the interval
        })

        timerCont.classList.remove('hidden') // make the timer visible
        timerCont.textContent = timeLeft // give the timer the seconds left
        timeLeft -= 1 // remove 1 from the timeLeft
    }, 1000) // set interval on 1 second
})

chatForm.addEventListener('submit', (e) => {
    e.preventDefault() // prevent the default action of a form submit
    
    if (message.value) { // check if the message has a value
        socket.emit('new message', { // if true then tell the server socket that there is an new message
            username: username, // bring along the username of the one who sends the messages
            message: message.value.toLowerCase() // and the message, in lower cases
        })
    }
    message.value = '' // empty the value of the input element
})

leaveRoom.addEventListener('click', () => {
    socket.emit('disconnect', username)
})