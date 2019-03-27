const request = require('request')


const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?limit=2&access_token=pk.eyJ1Ijoic3ZucmFqYTQ1NyIsImEiOiJjanRnMjUzb3QwY2hvNDRsaGN4M2I5aGw3In0.bkHRuQpHlFoi_UitqkypHQ'

    request({ url: url, json: true }, (error, response) => {

        if (error) {
            allback('unable to find the webservice', undefined)
        }
        else if (response.body.features.length === 0) {
            callback('unable to find the webservice . try another test', undefined)
        }
        else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode