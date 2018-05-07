const axios = require("axios");
const check = require('check');
const Promise = require("bluebird");

module.exports.getWeatherFromLocation = function (lat = 0, lng = 0, callback) {
    check(lat, Number);
    check(lng, Number);
    var weatherInfo = axios
        .get("https://api.darksky.net/forecast/2e72d52a0c74d9c693b3ab05bbf90a80/" + lat + "," + lng)
        .then(function (response) {
            return response.data.currently;
        })
        .catch(e => {
            // res.status(400).json({ msg: e });
        });
        return Promise.props({
            data: weatherInfo
        });
}