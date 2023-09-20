// CORE PACKAGE/MODULE
const fs = require('fs');


// THIRD PACKAGE/MODULE
// const http = require('http');
const express = require('express');
const app = express()

// middleware dari express
// memodifikasi incoming request/request body ke api kita
app.use(express.json());

// bikin env.port untuk membaca env port atau port 3000
const port = process.env.port || 8000;

// baca data dari file json
const cars = JSON.parse(fs.readFileSync(`${__dirname}/data/cars.json`));

// a. GET / akan membuka root endpoint dengan response {message: “ping successfully”}.
// Basic routing endpoint
app.get('/', (req, res) => {
    res.status(200).json({
        message: "ping successfuly",
    })
})

// b. GET /cars akan membuka list cars
// Menampilkan semua list cars
app.get('/api/v1/cars', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            cars
        }
    })
})

// c. GET /cars/:id akan membuka satu data cars.
// Menampilkan satu data cars menggunakan ID
app.get('/api/v1/cars/:id', (req, res) => {
    const carId = req.params.id;
    // Cari mobil berdasarkan ID
    const car = cars.find(el => el.id === carId)

    // Jika mobil ditemukan, kirimkan sebagai respons
    if(car) {
        res.status(200).json({
            status: 'success',
            data: {
                car
            }
        })
    } else {
        // Jika mobil tidak ditemukan, kirimkan respons 404 Not Found
        return res.status(404).json({
            status: 'failed',
            message: `car with id ${carId} this not found`
        })
    } 
});

// d. POST /cars akan mengembalikan response data cars yang sudah terbuat.
// Menambahkan data cars menggunakan endpoint POST
app.post('/api/v1/cars', (req, res) => {
    // generate id untuk data baru request api kita
    const newId = cars[cars.length - 1].id +1;
    const newCar = Object.assign({id: newId}, req.body);

    cars.push(newCar);
    fs.writeFile(`${__dirname}/data/cars.json`,
    JSON.stringify(cars), 
    err => { 
        res.status(201).json({
            status: 'success',
            data: {
                    car: newCar
                },
            });
         }
    );
    // res.send('udah');
});

// d. POST /cars akan mengembalikan response data cars yang sudah terbuat.
// Mengupdate data cars menggunakan endpoint PUT
app.put('/api/v1/cars/:id',(req, res) => {
    const carId = req.params.id;;
    // findIndex = -1 (kalau data nya gk ada)
    const carIndex = cars.findIndex(el => el.id === carId)

    if(!carIndex === -1) {
        return res.status(404).json({
            status: 'failed',
            message: `data with ${carId} this not found`
        })
    }
    cars[carIndex] = {...cars[carIndex], ...req.body}

    fs.writeFile(`${__dirname}/data/cars.json`,
    JSON.stringify(cars), 
    err => {
        res.status(200).json({
            status: 'success',
            message: `car with this id ${carId} edited`,
            data: {
                    car: cars[carIndex]
            },
        });
    })
})

// f. DELETE /cars/:id akan mengembalikan response data cars yang sudah terhapus.
// Menghapus data cars menggunakan endpoint DELETE
app.delete('/api/v1/cars/:id',(req, res) => {
    // konversi string jadi number
    const carId = req.params.id;
    // cari index dari data yang sesuai id di req.params
    const carIndex = cars.findIndex(el => el.id === carId);

    // validasi kalau data yang sesuai req.param id nya ga ada
    if(carIndex === -1) {
        return res.status(404).json({
            status: 'failed',
            message: 'data not found'
        })
    }
    // proses menghapus data sesuai index array nya dari req.param.id
    cars.splice(carIndex, 1)

    // proses update di file json nya
    fs.writeFile(`${__dirname}/data/cars.json`,
    JSON.stringify(cars), 
    err => {
        res.status(200).json({
            status: 'success',
            message: 'berhasil delete data',
            data: null
        });
    })
})

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
