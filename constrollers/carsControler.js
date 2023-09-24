const fs = require("fs")

// baca data dari file json
const cars = JSON.parse(
    fs.readFileSync(
        `${__dirname}/../dev-data/data/cars.json`,
        "utf-8"
    )
)

const checkId = (req, res, next, val) => {
    const car = cars.find((el) => el.id === val)

    if (!car) {
        return res.status(404).json({
            status: "failed",
            message: `data with this id : ${val} not found`,
        })
    }
    next()
}

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
        `${__dirname}/../dev-data/data/cars.json`,
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
    // if (!carIndex === -1) {
    //     return res.status(404).json({
    //         status: "failed",
    //         message: `data with ${carId} this not found`,
    //     })
    // }

    // Jika mobil ditemukan, mengganti data mobil dengan data dari permintaan (request)
    cars[carIndex] = {
        ...cars[carIndex],
        ...req.body,
    }

    // Menyimpan perubahan data mobil ke dalam file JSON
    fs.writeFile(
        `${__dirname}/../dev-data/data/cars.json`,
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
    // if (carIndex === -1) {
    //     return res.status(404).json({
    //         status: "failed",
    //         message: "data not found",
    //     })
    // }
    // proses menghapus data sesuai index array nya dari req.param.id
    cars.splice(carIndex, 1)

    // proses update di file json nya
    fs.writeFile(
        `${__dirname}/../dev-data/data/cars.json`,
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

module.exports = {
    ping,
    getAllcars,
    getCarsById,
    createCars,
    updateCars,
    removeCars,
    checkId,
}
