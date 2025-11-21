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
