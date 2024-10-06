// script.js

// Hàm định dạng ngày giờ
function formatDateTime(isoDate) {
    const date = new Date(isoDate);
    
    // Lấy các thành phần thời gian
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getUTCFullYear();

    // Định dạng lại
    return `${hours}:${minutes}:${seconds} Date: ${day}-${month}-${year}`;
}

// Hàm để lấy dữ liệu từ API và hiển thị lên trang
async function fetchLastRecord() {
    try {
        const response = await fetch('http://localhost:3000/last-record');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Định dạng lại ngày giờ
        const formattedDateTime = formatDateTime(data.timedate);

        // Hiển thị dữ liệu lên trang
        const recordContainer = document.getElementById('recordContainer');
        recordContainer.innerHTML = `
            <p><strong>ID:</strong> ${data.id}</p>
            <p><strong>Device Name:</strong> ${data.DeviceName}</p>
            <p><strong>Temperature:</strong> ${data.Temperature} °C</p>
            <p><strong>Pressure:</strong> ${data.Pressure} Bar</p>
            <p><strong>Date Time:</strong> ${formattedDateTime}</p>
        `;
        // Hiển thị nhiệt độ và áp suất
        const tempContainer = document.getElementById('Temp');
        tempContainer.innerHTML = `${data.Temperature} °C`; // Hiển thị nhiệt độ

        const presContainer = document.getElementById('Pres');
        presContainer.innerHTML = `${data.Pressure} hPa`; // Hiển thị áp suất
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

// Gọi hàm fetchLastRecord khi trang được tải
window.onload = fetchLastRecord;
