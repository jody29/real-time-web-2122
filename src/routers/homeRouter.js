const express = require('express')
const router = express.Router()

let user

router
.get('/', (req, res) => {
    res.render('pages/index')
})
.get('/room', (req, res) => {
    res.render('pages/room', {
        username: user
    })

})
.post('/username', (req, res) => {
    user = req.body.username
    res.redirect('/room')
})

module.exports = router