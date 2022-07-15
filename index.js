const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()

var weather = []

var geoLocation

app.get('/', (req, res) => {
    res.json('Welcome to my weather api')
})

app.get('/weather/today/:weatherId', (req, res) => {
    const weatherLocation = req.params.weatherId
    axios.get(`https://www.gps-latitude-longitude.com/gps-coordinates-of-${weatherLocation}`)
    .then((response) => {
        const html = response.data
        const $ = cheerio.load(html)
        var lat = $('tr').eq(0).find('td').eq(1).text();
        var long = $('tr').eq(1).find('td').eq(1).text();
        geoLocation = {
            latitude: lat,
            longitude: long
        }
    }).catch((err) => console.log(err))
    .then(() => {
        axios.get(`https://weather.com/weather/today/${geoLocation.latitude},${geoLocation.longitude}`)
        .then((response) => {
            const html = response.data
            const $ = cheerio.load(html)
            const currentTemp = $('span[class=CurrentConditions--tempValue--3a50n]').text()
            weather.push({
                currentTemperature: currentTemp
            })
            res.json(weather[0].currentTemperature)
            weather = []
        }).catch((err) => console.log(err))
    }).catch((err) => console.log(err))
})

app.get('/weather/forecast/:weatherId', (req, res) => {
    const weatherLocation = req.params.weatherId
    axios.get(`https://www.gps-latitude-longitude.com/gps-coordinates-of-${weatherLocation}`)
    .then((response) => {
        const html = response.data
        const $ = cheerio.load(html)
        var lat = $('tr').eq(0).find('td').eq(1).text();
        var long = $('tr').eq(1).find('td').eq(1).text();
        geoLocation = {
            latitude: lat,
            longitude: long
        }
    }).catch((err) => console.log(err))
    .then(() => {
        axios.get(`https://weather.com/weather/tenday/${geoLocation.latitude},${geoLocation.longitude}`)
        .then((response) => {
            const html = response.data 
            const $ = cheerio.load(html)
            const fTemps = []
            $('div[class=DetailsSummary--temperature--1Syw3]').each(function () {
                const forecastTemp = $(this).find('span').eq(0).text()
                if (forecastTemp != "--") {
                    fTemps.push(forecastTemp)
                }
            })
            weather.push({
                forecastTemperatures: fTemps
            })
            res.json(weather)
            weather = []
        }).catch((err) => console.log(err))
    }).catch((err) => console.log(err))
})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))