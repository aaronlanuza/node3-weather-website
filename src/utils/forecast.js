const request = require("postman-request");
const forecast = (longitude, latitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=dc56363eadb303137fbabdebf17e24bd&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services!", undefined);
    } else if (body.error) {
      callback("Unable to find location. try another search.", undefined);
    } else {
      callback(
        undefined,
        `It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out
      `
      );
    }
  });
};

module.exports = forecast;
