======== (Kriteria pengumpulan challenge) ========

Untuk data response bisa menggunakan data array nya saja. Referensi data ada pada link berikut : https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.json

○ Ketika ada request '/' maka server akan merespon dengan { message: “Ping successfully” }.

○ Ketika ada request list cars maka server akan merespon dengan array list mobil.

○ Ketika ada request detail cars maka server akan merespon dengan single data dari array mobil..

○ Ketika ada request create cars maka server akan merespon dengan array yang sudah terisi dengan
data mobil yang baru.

○ Ketika ada request update cars maka server akan merespon dengan data yang sudah diupdate dari
array data mobil.

○ Ketika ada request delete cars maka server akan merespon dengan data yang sudah dihapus dari
array data mobil

============== Detail Pengerjaan =============

Buat RESTful API untuk manajemen data mobil tanpa database (bisa menggunakan data array saja) :

a. GET '/' akan membuka root endpoint dengan response {message: “ping
successfully”}

b. GET '/api/v1/cars' akan membuka list cars

c. GET '/api/v1/cars/:id' akan membuka satu data cars.

d. POST '/api/v1/cars' akan mengembalikan response data cars yang sudah terbuat.

e. PUT '/api/v1/cars/:id' akan mengembalikan response data cars yang sudah
terupdate.

f. DELETE '/api/v1/cars/:id' akan mengembalikan response data cars yang sudah
terhapus.

Link Postman : https://interstellar-equinox-462342.postman.co/workspace/Binar-x-KM5-FSW2~cdb24ff3-7c26-4ecd-95f0-a9e062509d55/collection/29732503-e834f7a5-5be5-41f1-9255-0b9618152837?action=share&creator=29732503
