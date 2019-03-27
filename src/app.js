const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
// only for heroku 
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../src/templates/views')
const partialsPath = path.join(__dirname, '../src/templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather APP',
        name: 'Venkata Naga Raja'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Venkata Naga Raja Suragani'
    })
})

app.get('/help', (req, res) => {
    res.render('Help', {
        title: 'Help Page',
        name: 'Venkata Naga Raja Suragani'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastdata.temperatureitude,
                raining: forecastdata.precipProbability,
                location: location,
            })
        })
    })

})

app.get('/products', (req, res) => {

    console.log(req.query.search)
    res.send({
        products: []
    })

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
})
app.get('/help/*', (req, res) => {

    res.render('404', {
        title: '404 Page',
        name: 'Venkata Naga Raja Suragani',
        errorMessage: 'Help article Not Found'
    })
})

app.get('*', (req, res) => {

    res.render('404', {
        title: '404 Page',
        name: 'Venkata Naga Raja Suragani',
        errorMessage: 'Page Not Found'
    })
})
app.listen(port, () => {
    console.log('server is up on port.'+port)
})