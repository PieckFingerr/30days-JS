const apiKey = "81aa6846b7e6436cd3ce583c7f333a8c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".Search-bar input");
const searchBtn = document.querySelector(".Search-bar button");
const weatherIcon = document.querySelector(".weather-icon");    

async function checkWeather(city) {
    try {
    // Sử dụng template literal đúng cách với dấu nháy ``
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
                
    // Kiểm tra nếu phản hồi không thành công
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);  // Xem dữ liệu trả về từ API

    // Cập nhật thông tin thời tiết nếu API trả về thành công
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    } catch (error) {
    // In ra lỗi nếu xảy ra
    console.error("Error fetching weather data:", error);
    }

    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "Imgs/cloud.png";
    } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "Imgs/clear.png";
    } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "Imgs/rain.png";
    }
}
        
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})