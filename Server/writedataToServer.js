// writedataToServer.js
var fetch = require('node-fetch'); // Đảm bảo bạn đã cài đặt node-fetch
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

// Cấu hình kết nối đến SQL Server
var config = {
    server: 'localhost', // Hoặc địa chỉ IP của SQL Server
    authentication: {
        type: 'default',
        options: {
            userName: 'sa',  // Tên người dùng
            password: '123456' // Mật khẩu
        }
    },
    options: {
        trustServerCertificate: true,
        database: 'Testdb' // Tên cơ sở dữ liệu bạn muốn kết nối
    }
};

// Tạo kết nối
var connection = new Connection(config);

connection.on('connect', function(err) {
    if (err) {
        console.log('Error connecting to SQL Server:', err);
    } else {
        console.log('Connected to SQL Server');
        // Thiết lập interval để gọi fetchData mỗi 50 giây
        setInterval(fetchData, 50000); // 50000 ms = 50 giây
    }
});

// Hàm để lấy dữ liệu từ trang web
async function fetchData() {
    try {
        const response = await fetch('http://192.168.43.31/data', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Kiểm tra nếu phản hồi thành công
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Chuyển đổi phản hồi thành JSON
        const data = await response.json();

        // Hiển thị dữ liệu trong console
        console.log(data);

        // Gọi hàm để thêm dữ liệu vào SQL Server
        insertData(data.device, data.temperature, data.pressure);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Hàm chèn dữ liệu vào cơ sở dữ liệu
function insertData(device, temperature, pressure) {
    var query = `
        INSERT INTO [Testdb].[dbo].[Devices] ([DeviceName], [Temperature], [Pressure], [timedate])
        VALUES (@DeviceName, @Temperature, @Pressure, GETDATE())
    `;

    var request = new Request(query, (err) => {
        if (err) {
            console.error('Error inserting data:', err);
        } else {
            console.log('Data inserted successfully');
        }
    });

    request.addParameter('DeviceName', TYPES.VarChar, device);
    request.addParameter('Temperature', TYPES.Float, temperature);
    request.addParameter('Pressure', TYPES.Float, pressure);

    connection.execSql(request);
}

// Xuất hàm để có thể gọi từ file khác
module.exports = {
    startDataFetch: () => connection.connect()
};
