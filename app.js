const fs = require("fs")
const express = require("express")
const morgan = require("morgan")
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

// bikin env.port untuk membaca env port atau port 3000
const port = process.env.port || 8000

// baca data dari file json
const cars = JSON.parse(
    fs.readFileSync(`${__dirname}/data/cars.json`)
)

// a. GET / akan membuka root endpoint dengan response {message: “ping successfully”}.

const ping = (req, res) => {
    // Basic routing endpoint
    res.status(200).json({
        message: "ping successfuly",
    })
}

// b. GET /cars akan membuka list cars
// Menampilkan semua list cars
const getAllcars = (req, res) => {
    res.status(200).json({
        status: "success",
        requestTime: req.requestTime,
        data: {
            cars,
        },
    })
}

// c. GET /cars/:id akan membuka satu data cars.
// Menampilkan satu data cars menggunakan ID
const getCarsById = (req, res) => {
    const carId = req.params.id
    // Cari mobil berdasarkan ID
    const car = cars.find((el) => el.id === carId)

    // Jika mobil ditemukan, kirimkan sebagai respons
    if (car) {
        res.status(200).json({
            status: "success",
            data: {
                car,
            },
        })
    } else {
        // Jika mobil tidak ditemukan, kirimkan respons 404 Not Found
        return res.status(404).json({
            status: "failed",
            message: `car with id ${carId} this not found`,
        })
    }
}

// d. POST /cars akan mengembalikan response data cars yang sudah terbuat.
// Menambahkan data cars menggunakan endpoint POST
const createCars = (req, res) => {
    // generate id untuk data baru request api kita
    const newId = cars[cars.length - 1].id + 1
    const newCar = Object.assign(
        { id: newId },
        req.body
    )
    // Menambahkan mobil baru ke array 'cars'
    cars.push(newCar)
    fs.writeFile(
        `${__dirname}/data/cars.json`,
        JSON.stringify(cars),
        (err) => {
            res.status(201).json({
                status: "success",
                data: {
                    car: newCar,
                },
            })
        }
    )
}

// d. POST /cars akan mengembalikan response data cars yang sudah terbuat.
// Mengupdate data cars menggunakan endpoint PUT
const updateCars = (req, res) => {
    const carId = req.params.id
    // findIndex = -1 (kalau data nya gk ada)
    const carIndex = cars.findIndex(
        (el) => el.id === carId
    )

    // Memeriksa apakah mobil dengan ID yang diberikan ditemukan
    if (!carIndex === -1) {
        return res.status(404).json({
            status: "failed",
            message: `data with ${carId} this not found`,
        })
    }

    // Jika mobil ditemukan, mengganti data mobil dengan data dari permintaan (request)
    cars[carIndex] = {
        ...cars[carIndex],
        ...req.body,
    }

    // Menyimpan perubahan data mobil ke dalam file JSON
    fs.writeFile(
        `${__dirname}/data/cars.json`,
        JSON.stringify(cars),
        (err) => {
            res.status(200).json({
                status: "success",
                message: `car with this id ${carId} edited`,
                data: {
                    car: cars[carIndex],
                },
            })
        }
    )
}

// f. DELETE /cars/:id akan mengembalikan response data cars yang sudah terhapus.
// Menghapus data cars menggunakan endpoint DELETE
const removeCars = (req, res) => {
    // konversi string jadi number
    const carId = req.params.id
    // cari index dari data yang sesuai id di req.params
    const carIndex = cars.findIndex(
        (el) => el.id === carId
    )

    // validasi kalau data yang sesuai req.param id nya ga ada
    if (carIndex === -1) {
        return res.status(404).json({
            status: "failed",
            message: "data not found",
        })
    }
    // proses menghapus data sesuai index array nya dari req.param.id
    cars.splice(carIndex, 1)

    // proses update di file json nya
    fs.writeFile(
        `${__dirname}/data/cars.json`,
        JSON.stringify(cars),
        (err) => {
            res.status(200).json({
                status: "success",
                message: "berhasil delete data",
                data: null,
            })
        }
    )
}
// Membuat router khusus untuk rute '/test'
const testRouter = express.Router()
// Membuat router khusus untuk rute '/api/v1/cars'
const carRouter = express.Router()
//  Menyambungkan rute '/test' dengan fungsi 'ping' saat rute tersebut diakses dengan metode GET
testRouter.route("/").get(ping)

carRouter
    .route("/")
    .get(getAllcars) // Mendapatkan semua data mobil
    .post(createCars) // Membuat data mobil baru

carRouter
    .route("/:id")
    .get(getCarsById) // Mendapatkan data mobil berdasarkan ID
    .put(updateCars) // Mengubah data mobil berdasarkan ID
    .delete(removeCars) // Menghapus data mobil berdasarkan ID

// Menggunakan router '/test' untuk rute beranda ('/')
app.use("/", testRouter)
// Menggunakan router '/api/v1/cars' untuk rute yang berkaitan dengan mobil
app.use("/api/v1/cars", carRouter)

// Mulai server Express.js
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})
