function getTempColor(t) {
	if (t >= 35) {
		return '#ff5722';
	} else if (t >= 30) {
		return '#ff9800';
	} else if (t >= 25) {
		return '#ffc107';
	} else if (t >= 18) {
		return '#4caf50';
	} else if (t > 10) {
		return '#8bc34a';
	} else if (t >= 5) {
		return '#00bcd4';
	} else if (t >= -5) {
		return '#03a9f4';
	} else {
		return '#2196f3';
	}
}

function getHumColor(x) {
	var colors = ['#E3F2FD','#BBDEFB','#90CAF9','#64B5F6','#42A5F5','#2196F3','#1E88E5','#1976D2','#1565C0','#0D47A1','#0D47A1'];
	return colors[Math.round(x/10)];
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
        humGauge.setVal(data.Pressure).setColor(getPressureColor(data.Pressure));

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Giả sử bạn có một hàm để lấy màu theo giá trị của áp suất
function getPressureColor(pressure) {
    if (pressure < 1000) {
        return '#ff6666'; // Ví dụ: áp suất thấp - màu đỏ
    } else if (pressure >= 1000 && pressure < 1020) {
        return '#ffcc66'; // Ví dụ: áp suất trung bình - màu vàng
    } else {
        return '#66cc66'; // Ví dụ: áp suất cao - màu xanh lá
    }
}


var tempGauge = createVerGauge('TemperatureHaH', 0, 200, ' °C').setVal(0).setColor(getTempColor(0));
var humGauge = createRadGauge('PressureHaH', 0, 20, '%').setVal(0).setColor(getHumColor(0));

document.getElementById('refresh').addEventListener('click', refresh);
setTimeout(refresh, 100);
