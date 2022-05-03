const isAuthenticated = (req, res, next) => {
    if (req.query.username) return next()
    res.redirect('/')
}

module.exports = isAuthenticated