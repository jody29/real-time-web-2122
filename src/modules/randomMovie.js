const fetchData = require('./fetchData.js')

let randomMovie

const randomDateMaker = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

const randomDate = randomDateMaker(new Date(1980, 0, 1), new Date())
const randomYear = randomDate.getFullYear().toString()

const randomPage = Math.floor(Math.random() * 10)

const categories = ['popular', 'top_rated']

const randomCatNum = Math.floor(Math.random() * categories.length)

const randomCat = categories[randomCatNum]


const randomSortedMovieData = async () => {
    const url = `https://api.themoviedb.org/3/movie/${randomCat}?api_key=${process.env.MOVIEDB_TOKEN}&language=en-US&page=${randomPage}&year=${randomYear}`

    const movieData = await fetchData(url)

    const randomNumb = Math.floor(Math.random() * movieData.results.length)

    randomMovie = movieData.results[randomNumb]

    return randomMovie
}

module.exports = randomSortedMovieData