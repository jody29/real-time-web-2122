const isAuthenticated = (req, res, next) => {
    if (req.query.username) return next() // if there is an username in the query, then go to the next middleware
    res.redirect('/') // otherwise redirect to the homepage
}

module.exports = isAuthenticated