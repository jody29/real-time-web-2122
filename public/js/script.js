const socket = io()
const leaveRoom = document.querySelector('#leave')
const userList = document.querySelector('#userList')

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

leaveRoom.addEventListener('click', () => {
    socket.emit('disconnect', username)
})