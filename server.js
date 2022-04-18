const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require("./config")
const router = require("./routes")

var app = express();

app.use(express.static(config.server.staticPath))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(bodyParser.text());

app.use(bodyParser.json({
    limit: '50mb'
}));

app.use("/api", router)

let server = app.listen(config.server.port,console.log(`** EDU simple geolocation server starts at port ${config.server.port}`))
module.exports = server