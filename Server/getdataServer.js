// getdataServer.js
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

// Cấu hình kết nối
var config = {
    server: 'localhost',
    authentication: {
        type: 'default',
        options: {
            userName: 'sa',
            password: '123456'
        }
    },
    options: {
        trustServerCertificate: true,
        database: 'Testdb'
    }
};

// Hàm lấy dữ liệu cuối cùng từ bảng Devices
function getLastRecord(callback) {
    const query = `SELECT TOP 1 [id], [DeviceName], [Temperature], [Pressure], [timedate] 
                   FROM [Testdb].[dbo].[Devices] 
                   ORDER BY [timedate] DESC`;

    // Tạo kết nối
    var connection = new Connection(config);

    connection.on('connect', function(err) {
        if (err) {
            console.log(err);
            callback(err, null);
        } else {
            console.log('Connected');
            // Tạo yêu cầu
            const request = new Request(query, function(err, rowCount, rows) {
                if (err) {
                    console.error(err);
                    callback(err, null);
                } else {
                    console.log(`Retrieved ${rowCount} row(s)`);
                }
            });

            // Xử lý dữ liệu trả về
            request.on('row', function(columns) {
                let result = {};
                columns.forEach(function(column) {
                    result[column.metadata.colName] = column.value;
                });
                callback(null, result); // Gọi callback với dữ liệu
            });

            // Thực thi yêu cầu
            connection.execSql(request);
        }
    });

    connection.connect();
}

// Xuất hàm getLastRecord để sử dụng ở file khác
module.exports = {
    getLastRecord
};
