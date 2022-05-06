const fetch = require('node-fetch')

const getData = async function fetchData(url) { // create asynchronius function
    const apiData = await fetch(url) // await the fetch data
    .then(response => response.json()) // return json of the response
    .catch(err => console.log(err)) // if error is catched, then log this error

    return apiData // return the result from the API fetch
}

module.exports = getData