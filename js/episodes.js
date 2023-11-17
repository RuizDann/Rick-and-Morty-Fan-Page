// Function to make an API request and handle errors
async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// Function to fetch all data from paginated API
async function fetchAllData(url) {
  let allEpisodes = [];

  try {
    while (url) {
      const data = await fetchData(url);
      allEpisodes = allEpisodes.concat(data.results);
      console.log("allEpisodes:", allEpisodes);
      url = data.info.next;
    }

    displayDataInTable(allEpisodes);
  } catch (error) {
    console.error("Error fetching all data:", error);
  }
}

// Function to display data in a table
function displayDataInTable(episodes) {
  const tableBody = document.querySelector("#episodesTable tbody");

  episodes.forEach((episode) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${episode.name || "N/A"}</td>
      <td>${episode.air_date || "N/A"}</td>
      <td>${episode.episode || "N/A"}</td>
      <td>${episode.characters.length || "N/A"}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Initial API URL for episodes
const apiUrlEpisodes = "https://rickandmortyapi.com/api/episode";
fetchAllData(apiUrlEpisodes);