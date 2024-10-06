function fetchData() {
    fetch('http://192.168.43.31/data')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Hoặc response.text() nếu dữ liệu không phải JSON
        })
        .then(data => {
            const reportElement = document.querySelector('.esp32-report');
            if (Object.keys(data).length === 0) {
                // Nếu không có dữ liệu
                reportElement.textContent = 'Không có dữ liệu!';
            } else {
                // Nếu có dữ liệu, hiển thị thông báo đã kết nối
                reportElement.textContent = 'Đã kết nối thiết bị ESP32. Dữ liệu: ' + JSON.stringify(data, null, 2);
            }
        })
        .catch(error => {
            // Nếu có lỗi trong quá trình fetch
            document.querySelector('.esp32-report').textContent = 'Không kết nối thiết bị ESP32. Lỗi: ' + error.message;
        });
}

// Gọi hàm fetchData lần đầu tiên
fetchData();

// Thiết lập để gọi lại hàm fetchData mỗi 10 giây (10000ms)
setInterval(fetchData, 10000);
