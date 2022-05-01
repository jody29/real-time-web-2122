const express = require('express')
const router = express.Router()

let user

router
.get('/', (req, res) => {
    res.render('pages/index')
})
.get('/game', (req, res) => {
    res.render('pages/room', {
        username: req.query.username
    })

})

module.exports = router