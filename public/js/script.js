const socket = io()
const username = document.querySelector('#username').value
const leaveRoom = document.querySelector('#leave')
const userList = document.querySelector('#userList')

socket.emit('user connected', username)

socket.on('new user', (users) => {
    userList.innerHTML = ''

    users.forEach(user => {

        let userItem = document.createElement('li')

        userItem.textContent = user.username

        userList.appendChild(userItem)
    })
})

leaveRoom.addEventListener('click', () => {
    socket.emit('user disconnected', username)
})