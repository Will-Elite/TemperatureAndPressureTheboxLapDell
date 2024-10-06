function getTempColor(t) {
    if (t >= 160) {
        return '#b71c1c'; // Đỏ đậm
    } else if (t >= 120) {
        return '#f44336'; // Đỏ
    } else if (t >= 90) {
        return '#ff9800'; // Cam
    } else if (t >= 70) {
        return '#ffc107'; // Vàng
    } else if (t >= 50) {
        return '#4caf50'; // Xanh lá cây
    } else if (t >= 25) {
        return '#03a9f4'; // Xanh dương nhạt
    } else if (t >= 10) {
        return '#0288d1'; // Xanh dương đậm hơn
    } else {
        return '#01579b'; // Xanh biển đậm
    }
}


function getPresColor(x) {
    // Mảng màu chuyển từ xanh nhạt đến xanh đậm
    var colors = [
        '#E3F2FD', // Xanh rất nhạt
        '#BBDEFB', // Xanh nhạt
        '#90CAF9', // Xanh nhạt hơn
        '#64B5F6', // Xanh vừa
        '#42A5F5', // Xanh sáng
        '#2196F3', // Xanh dương chuẩn
        '#1E88E5', // Xanh dương đậm
        '#1976D2', // Xanh đậm hơn
        '#1565C0', // Xanh dương rất đậm
        '#0D47A1'  // Xanh dương đậm nhất
    ];
    
    // Đảm bảo giá trị áp suất x nằm trong khoảng từ 0 đến 10
    const index = Math.min(Math.max(Math.round(x), 0), colors.length - 1);
    
    return colors[index];
}

async function refresh() {
    try {
        const response = await fetch('http://localhost:3000/last-record');
        
        // Kiểm tra nếu phản hồi không thành công
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Chuyển đổi phản hồi thành JSON
        const data = await response.json();

        // Cập nhật nhiệt độ
        tempGauge.setVal(data.Temperature).setColor(getTempColor(data.Temperature));

        // Cập nhật áp suất
        //presGauge1.setVal(data.Pressure).setColor(getPresColor(data.Pressure));

        // Cập nhật nhiệt độ
        //tempGauge1.setVal(data.Temperature).setColor(getTempColor(data.Temperature));

        // Cập nhật áp suất
        presGauge.setVal(data.Pressure).setColor(getPresColor(data.Pressure));
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}




var tempGauge = createVerGauge('TemperatureHaH', 0, 200, ' °C').setVal(0).setColor(getTempColor(0));
var presGauge = createRadGauge('PressureHaH', 0, 10, '%').setVal(0).setColor(getPresColor(0));

//var tempGauge1 = createVerGauge('TemperatureHaH1', 0, 200, ' °C').setVal(0).setColor(getTempColor(0));
//var presGauge1 = createRadGauge('PressureHaH1', 0, 10, '%').setVal(0).setColor(getPresColor(0));

document.getElementById('refresh').addEventListener('click', refresh);
setTimeout(refresh, 100);
