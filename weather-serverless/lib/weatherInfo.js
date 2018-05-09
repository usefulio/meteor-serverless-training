const axios = require("axios");

export const coordinatesToWeather = (lat = 0, lng = 0, callback) => {
    return axios
        .get(`https://api.darksky.net/forecast/2e72d52a0c74d9c693b3ab05bbf90a80/${lat},${lng}`)
        .then((response) => {
            return response.data.currently;
        });
}