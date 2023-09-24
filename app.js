const fs = require("fs")

const express = require("express")
const morgan = require("morgan")

const carRouter = require("./routes/carRoutes")
const testRouter = require("./routes/testRoutes")

const app = express()

// middleware dari express
app.use(express.json())
app.use(morgan("dev"))

// OUR OWN MIDDLEWARE
// logging
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    console.log(req.requestTime)
    next()
})

// Menggunakan router '/test' untuk rute beranda ('/')
app.use("/", testRouter)
// Menggunakan router '/api/v1/cars' untuk rute yang berkaitan dengan mobil
app.use("/api/v1/cars", carRouter)

module.exports = app
