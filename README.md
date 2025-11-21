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

-----------------------------------------------------


                    News-header.js
                    const apiKey = "pub_2e07e5a74d144705977fc067a9e4ae54"; //Key taken from site 
            const URL = `https://newsdata.io/api/1/latest?apikey=${apiKey}&q=Hurricanes`; //Url with the apiKey updated 
            
            fetch(URL) //Grabs the url
              .then(response => response.json())
              .then(data => {
                console.log(data);
            
                if (!data.results || data.results.length === 0) {
                  document.getElementById("main-title").textContent = "No title available";
                  document.getElementById("description").textContent = "No description available";
                  return; //If the data is not correct then this is displayed 
                }
            
                // Main article 
                const mainArticle = data.results[0]; //Grabs the first article 
            
                document.getElementById("main-title").textContent = mainArticle.title || "No title available"; 
                document.getElementById("description").textContent = mainArticle.description || "No description available"; //If the information is not provided
            
                // If image is avable grabs it 
                if (mainArticle.image_url) {
                  document.querySelector(".article img").src = mainArticle.image_url;
                } //Displays image if it is avable 
            
                // 4 other stories
                const archiveItems = document.querySelectorAll(".archive .five-day");
                const stories = data.results.slice(1, 5); //This skips the first story and grabs up to 4 stories to display 
            
                stories.forEach((story, index) => {
                  const card = archiveItems[index]; 
            
                  // Update title + description
                  card.querySelector("h3").textContent = story.title || "No title available";
                  card.querySelector("p").textContent = story.description || "No information available"; //Again if no information is available
            
                  // Update image if available
                  if (story.image_url) {
                    card.querySelector("img").src = story.image_url;
                  }
                });
            
              }) //this will do the same for each card to display different stories, the title, description and images. 
              .catch(error => console.error("Error:", error));
            
