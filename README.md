Updated the weather site to pull information from Weathermap.org
Working link: https://samirulu87-jpg.github.io/updated-weather-news-app/weather_report.html

      weather-header.js code & comments 
      
      const lat = 40.7608;
      const lon = -111.8910;
      const apiKey = "b57ed8c88a092268ec4a2a3745c796d9"; //grabed key from the site
      
      const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;  //url that the information is pulled from 
      
      // Generate weekday names
      function getDayName(dateString) {
        const date = new Date(dateString); //grabed the date 
        return date.toLocaleDateString("en-US", { weekday: "long" }); //displayed the date 
      }
      
      fetch(URL)
        .then(response => response.json())
        .then(data => {
          console.log(data);
      
          // CURRENT CONDITIONS 
          const currentWeather = data.list[0].weather[0].description;
          document.getElementById("current-desc").textContent = currentWeather;
      
          document.getElementById("current-temp").textContent =
            data.list[0].main.temp;
      
          document.getElementById("current-windChill").textContent =
            data.list[0].main.feels_like;
      
          document.getElementById("current-humid").textContent =
            data.list[0].main.humidity;
      
          document.getElementById("current-windSpeed").textContent =
            data.list[0].wind.speed;
      
          // 5-DAY FORECAST
          let dayIndex = 1;
      
          for (let i = 0; i < data.list.length && dayIndex <= 5; i++) {
            const forecast = data.list[i];
      
            // Only pick the forecast for 12:00 PM each day
            if (forecast.dt_txt.includes("12:00:00")) {
      
              // Day name
              document.getElementById(`dayTitle${dayIndex}`).textContent =
                getDayName(forecast.dt_txt);
      
              // Temperature
              document.getElementById(`temp${dayIndex}`).textContent =
                Math.round(forecast.main.temp);
      
              // Icon
              const iconCode = forecast.weather[0].icon;
              document.getElementById(`weatherIcon${dayIndex}`).src =
                `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      
              dayIndex++;
            }
          }
          const mainWeatherIconCode = data.list[0].weather[0].icon;
      document.getElementById("mainWeatherImg").src =
        `https://openweathermap.org/img/wn/${mainWeatherIconCode}@4x.png`;
      
        })
        .catch(err => console.error("Fetch error:", err));
