const express = require("express")
const carsController = require("../constrollers/carsControler")

const router = express.Router()

router.param("id", carsController.checkId)
router
    .route("/")
    .get(carsController.getAllcars) // Mendapatkan semua data mobil
    .post(carsController.createCars) // Membuat data mobil baru

router
    .route("/:id")
    .get(carsController.getCarsById) // Mendapatkan data mobil berdasarkan ID
    .put(carsController.updateCars) // Mengubah data mobil berdasarkan ID
    .delete(carsController.removeCars) // Menghapus data mobil berdasarkan ID

module.exports = router
