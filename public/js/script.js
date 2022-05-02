const socket = io()
const leaveRoom = document.querySelector('#leave')
const userList = document.querySelector('#userList')
const newMovie = document.querySelector('.newMovie')
const movieCont = document.querySelector('#moviePoster')

const urlParams = new URLSearchParams(window.location.search)
const username = urlParams.get('username')

socket.emit('user connected', username)

socket.on('new user', users => {
    userList.innerHTML = ''

    users.forEach(user => {

        let userItem = document.createElement('li')

        userItem.textContent = `${user.username}: ${user.score}`

        userList.appendChild(userItem)
    })
})

socket.on('random movie', movie => {
    movieCont.innerHTML = ''

    const img = document.createElement('img')

    img.src = `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
    img.alt = `poster of random movie`

    movieCont.appendChild(img)
})

newMovie.addEventListener('click', () => {
    socket.emit('new movie')
})

leaveRoom.addEventListener('click', () => {
    socket.emit('disconnect', username)
})