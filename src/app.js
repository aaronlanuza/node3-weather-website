"user strict";
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");
const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const hbs = require("hbs");
const { strict } = require("assert/strict");
const viewsPath = path.join(__dirname, "../src/templates");
const partialsPath = path.join(__dirname, "../src/templates/partials");
//app.com
//app.com/help
//app.com/about
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
  res.render("index.hbs", {
    title: "Weather",
    name: "Lanuza, Aaron Jeremy R.",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.address);
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        console.log(error);
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          console.log(error);
          return res.send({
            error: "Unable to find location!",
          });
        }
        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Lanuza, Aaron Jeremy R.",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Lanuza, Aaron Jeremy R.",
    age: 22,
  });
});

app.get("/help/*", (req, res) => {
  res.render("error404", {
    errorType: "Help article not found!",
  });
});

app.get("*", (req, res) => {
  res.render("error404", {
    errorType: "Page not Found!",
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is up on port 3000.");
});
