const fetchData = require('./fetchData.js')

let randomMovie // variable for the random movie

const randomDateMaker = (start, end) => { // function that returns a random date
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

const randomSortedMovieData = async () => {
    const randomDate = randomDateMaker(new Date(1980, 0, 1), new Date()) // call the function to create a random date
    const randomYear = randomDate.getFullYear().toString() // get the year of the random date and turn it to a string
    const randomPage = Math.floor(Math.random() * 10) // get a random number between 0 and 9
    const categories = ['popular', 'top_rated'] // array for the two categories
    const randomCatNum = Math.floor(Math.random() * categories.length) // get random index for the categories array
    const randomCat = categories[randomCatNum] // get either popular or top_rated from the categories array

    const url = `https://api.themoviedb.org/3/movie/${randomCat}?api_key=${process.env.MOVIEDB_TOKEN}&language=en-US&page=${randomPage}&year=${randomYear}`

    const movieData = await fetchData(url) // await the fetchData function

    const randomNumb = Math.floor(Math.random() * movieData.results.length) // create random index for the movieData array

    randomMovie = movieData.results[randomNumb] // get a random movie from the movieData array

    return randomMovie // return the random movie
}

module.exports = randomSortedMovieData