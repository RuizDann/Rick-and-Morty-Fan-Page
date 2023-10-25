async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function fetchAllData(url) {
  let allLocations = [];
  try {
    while (url) {
      const data = await fetchData(url);
      allLocations = allLocations.concat(data.results);
      console.log("allLocations:", allLocations);
      url = data.info.next;
    }

    displayDataInTable(allLocations);
  } catch (error) {
    console.error("Error fetching all data:", error);
  }
}

function displayDataInTable(locations) {
  const tableBody = document.querySelector("#locationsTable tbody");

  locations.forEach((location) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${location.name || "N/A"}</td>
      <td>${location.type || "N/A"}</td>
      <td>${location.dimension || "N/A"}</td>
      <td>${location.residents.length || "N/A"}</td>
    `;
    tableBody.appendChild(row);
  });
}

const apiUrl = "https://rickandmortyapi.com/api/location";
fetchAllData(apiUrl);