const express = require('express')
const router = express.Router()

router
.get('/', (req, res) => {
    res.render('pages/index')
})
.get('/game', (req, res) => {
    res.render('pages/room')
})

module.exports = router