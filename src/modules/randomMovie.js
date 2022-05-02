const fetchData = require('./fetchData.js')

let randomMovie

const randomDateMaker = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

const randomDate = randomDateMaker(new Date(1980, 0, 1), new Date())
const randomYear = randomDate.getFullYear().toString()

const randomSortedMovieData = async () => {
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.MOVIEDB_TOKEN}&language=en-US&page=1&year=${randomYear}`

    const movieData = await fetchData(url)

    const randomNumb = Math.floor(Math.random() * movieData.results.length + 1)

    randomMovie = movieData.results[randomNumb]

    return randomMovie
}

module.exports = randomSortedMovieData