import get from 'lodash/get';
const { GEOCODE_URL, GEOCODE_API_KEY } = process.env;
const axios = require("axios");

export const zipCodeToCoordinates = (zipcode = 75252) => {
    return axios
        .get(`${GEOCODE_URL}${zipcode}&key=${GEOCODE_API_KEY}`)
        .then(function (response) {
            const locationObj = get(response, 'data.results[0].geometry.location');
            if(!locationObj){
                return false;
            }
            const { lat, lng } = locationObj;
            return { lat, lng};
        });
}