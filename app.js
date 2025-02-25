const form = document.getElementById("FORM");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const cityname = document.getElementById("searchCity").value.toLowerCase();
  let result = await fetchData(cityname);
  // console.log(result);

  let cityName = document.getElementById("cityName");
  cityName.innerHTML = result.location.name;

  let temperature1 = document.getElementById("city-temperature");
  temperature1.innerHTML = result.current.temp_c + "°" + "C";

  let temperature2 = document.getElementById("city-temperature-low");
  temperature2.innerHTML = result.current.temp_f + "°" + "F";

  let weatherIcon = document.getElementById("city-weather-img");
  weatherIcon.src = "https:" + result.current.condition.icon;
  weatherIcon.style.width = "70px";
  weatherIcon.style.height = "70px";

  //*DECONSTRUCTING OBJECT TO MAKE THE DATA SMALLER */

  // let weatherDetails = result.map((weather)) => ({
  //     date: weather.date,
  //     temp: weather.day.avgtemp_c,
  //     icon: weather.day.condition.icon,
  // });

  // let todaysForecast = result.forecast.forecastday.map((forecastday) => ({
  //   date: forecastday.date,
  //   temp: forecastday.day.avgtemp_c,
  //   icon: forecastday.day.condition.icon,
  // }));

  // let hourly_forecast = result.map((x) => ({
  //   condition: x.condition.text,
  //   time: x.time.split(" ")[1],
  //   temp: x.temp_c,
  // }));

  // console.log(hourly_forecast);

  // let weatherDetailss = result.forecast.forecastday.map((astro) => ({
  //   date: forecastday.date,
  //   temp: forecastday.day.avgtemp_c,
  //   icon: forecastday.day.condition.icon,
  // }));

  // let timeAttwelve = document.getElementById("twelveOclock");
  // timeAttwelve.innerHTML = weatherDetailss[0].date;

  let hourDiv = document.getElementById("hourlyDiv");
  hourDiv.innerHTML = " ";

  for (const item of result.forecast.forecastday[0].hour) {
    // console.log(item);
    hourDiv.innerHTML += `
          <div class="forecast">
            <h5 id="twelveOclock">${dayjs(item.time).format("HH")}:00</h5>
            <img src="https:${
              item.condition.icon
            }" alt="" class="weather-sunny-img" />
            <span>${item.temp_c}</span>
          </div>
    `;
    console.log(dayjs(item.time).format("HH"));
  }

  let sunrise = document.getElementById("sunriseTime");
  let sunset = document.getElementById("sunsetTime");
  let chanceofrain = document.getElementById("cor");
  let pressure = document.getElementById("pressure");
  let wind = document.getElementById("wind");
  let uvindex = document.getElementById("uvIndex");
  let feeling = document.getElementById("feelsLike");
  let visibility = document.getElementById("visibility");

  sunrise.innerHTML = result.forecast.forecastday.astro.sunrise;
  console.log(sunrise);
});

// const searchButton = document.getElementById("search-btn");

async function fetchData(cityName) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=095dcf0d2a1048ab83b90847251402&q=${cityName}&days=7`
    );

    if (!response.ok) {
      alert("Cannot find city");
      throw new Error("Could not fetch city");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
