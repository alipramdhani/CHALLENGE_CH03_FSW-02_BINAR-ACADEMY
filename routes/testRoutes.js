const express = require("express")
const carsController = require("../constrollers/carsControler")

const router = express.Router()

router.route("/").get(carsController.ping)

module.exports = router
