const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth.js')

router
.get('/', (req, res) => {
    res.render('pages/index')
})
.get('/game', auth, (req, res) => {
    res.render('pages/room')
})

module.exports = router