const request = require('request')

const forecast = (longitude, latitude, callback) => {

  const url = 'https://api.darksky.net/forecast/45c6e671252d4ab9b003daba21739306/' + longitude + ',' + latitude

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('unable to find the webservice', undefined)
    }
    else if (response.body.currently.length === 0) {
      callback('unable to find the webservice . try another test', undefined)
    }
    else {
      callback(undefined, {
        temperatureitude: response.body.currently.temperature,
        precipProbability: response.body.currently.precipProbability
      })
    }
  })
}

module.exports = forecast