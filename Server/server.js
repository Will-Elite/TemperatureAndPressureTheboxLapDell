// server.js
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors'); // Thêm dòng này
var { getLastRecord } = require('./getdataServer'); // Gọi hàm từ file getdataServer.js

var startDataFetch = require('./writedataToServer').startDataFetch; // Gọi hàm từ file writedataToServer.js

var app = express();
var port = 3000;

// Sử dụng middleware cors
app.use(cors());

// Cấu hình body-parser để xử lý JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Thêm dòng này để phục vụ các file tĩnh từ thư mục 'public'
//app.use(express.static('public'));


//Định nghĩa route để lấy dữ liệu
app.get('/last-record', (req, res) => {
    getLastRecord((err, data) => {
        if (err) {
            res.status(500).send('Error fetching data');
        } else {
            res.json(data); // Trả dữ liệu dưới dạng JSON
        }
    });
});


// Khởi động quá trình lấy dữ liệu
startDataFetch();

// Bắt đầu server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
