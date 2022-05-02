const fetch = require('node-fetch')

const getData = async function fetchData(url) {
    const apiData = await fetch(url)
    .then(response => response.json())
    .catch(err => console.log(err))

    return apiData
}

module.exports = getData