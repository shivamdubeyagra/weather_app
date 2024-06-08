const api_key = "56bfa9978adb0296b72261fbc3b1479a";
const searchButton = document.querySelector(".search");
const h1temp = document.querySelector(".temp-details h1");
const h2tempName = document.querySelector(".temp h2");
const h2temp = document.querySelector(".temp-details h2");
const ptemp = document.querySelector(".temp-details p");
const air = document.querySelector(".air p");
const feels = document.querySelector(".feels p");
const visi = document.querySelector(".visi p");
const humi = document.querySelector(".humi p");
const wind = document.querySelector(".wind p");
const sea = document.querySelector(".sea p");
const airImg = document.querySelector(".temp img");
const onOff = document.querySelector(".onOff");
const load = document.querySelector(".load");
const getloc = document
  .querySelector(".getloc")
  .addEventListener("click", getLocalion);

async function checkWeatherCord(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
  );
  const data = await response.json();
  if (lat && lon) {
    onOff.style.display = "block";
    load.innerHTML = "";
  }
  displayWeather(data);
}

async function checkWeather(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
  );
  const data = await response.json();
  if (city) {
    onOff.style.display = "block";
    load.innerHTML = "";
  }
  displayWeather(data);
}

function displayWeather(data) {
  h1temp.innerHTML = Math.round(data.main.temp) + "°c";
  h2temp.innerHTML = data.name;
  h2tempName.innerHTML = data.weather[0].main;
  air.innerHTML = data.main.pressure + " hpa";
  feels.innerHTML = Math.round(data.main.feels_like) + "°c";
  humi.innerHTML = data.main.humidity + " %";
  visi.innerHTML = data.visibility / 1000 + " km";
  wind.innerHTML = data.wind.speed + "km";
  if (data.main.sea_level) {
    sea.innerHTML = data.main.sea_level;
  }

  if (data.weather[0].main === "Clouds") {
    airImg.src = "./assets/clouds.png";
  } else if (data.weather[0].main === "Rain") {
    airImg.src = "./assets/rain.png";
  } else if (data.weather[0].main === "Clear") {
    airImg.src = "assets/clear.png";
  } else if (data.weather[0].main === "Drizzle") {
    airImg.src = "assets/drizzel.png";
  } else if (data.weather[0].main === "Mist") {
    airImg.src = "assets/mist.png";
  } else if (data.weather[0].main === "Haze") {
    airImg.src = "assets/haze.png";
  }
  ptemp.innerHTML = `Maximum ${Math.round(data.main.temp_max)} °c`;
}
searchButton.addEventListener("click", async () => {
  const location = document.querySelector(".input-text").value;
  localStorage.setItem("lastLocation", location);
  if (location) {
    checkWeather(location);
  }
});
window.onload = () => {
  const lastLocation = localStorage.getItem("lastLocation");
  if (lastLocation) {
    checkWeather(lastLocation);
  }
};

function getLocalion() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        await checkWeatherCord(lat, lon);
        console.log(lat, lon);
      },
      () => {
        alert("Location access denied. Please enter your location manually.");
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
