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
  let allCharacters = [];
  try {
    while (url) {
      const data = await fetchData(url);
      allCharacters = allCharacters.concat(data.results);
      console.log("allCharacters:", allCharacters);
      url = data.info.next;
    }
    
    displayDataInCards(allCharacters);
  } catch (error) {
    console.error("Error fetching all data:", error);
  }
}

function displayDataInCards(characters) {
  const cardsContainer = document.querySelector("#charactersCards");
  
  characters.forEach((character) => {
    const card = document.createElement("div");
    card.classList.add("card", "mx-2", "bg-light", "shadow-lg", "border");
    card.style.width = "18em";
    
    card.innerHTML = `
      <img src="${character.image}" class="card-img-top pt-2 align-self-center" alt="${character.name}" style="width: 12em;">
      <div class="card-body text-center">
        <h5 class="card-title border-bottom" style="font-weight: bold;">${character.name || "N/A"}</h5>
        <p class="card-text"><span style="font-weight: bold;">Species:</span> ${character.species || "N/A"}</p>
        <p class="card-text"><span style="font-weight: bold;">Status:</span> ${character.status || "N/A"}</p>
        <p class="card-text"><span style="font-weight: bold;">Gender:</span> ${character.gender || "N/A"}</p>
        <p class="card-text"><span style="font-weight: bold;">Origin:</span> ${character.origin.name || "N/A"}</p>
        <p class="card-text"><span style="font-weight: bold;">Location:</span> ${character.location.name || "N/A"}</p>
        <p class="card-text"><span style="font-weight: bold;">Episodes:</span> ${character.episode.length || "N/A"}</p>
      </div>
    `;
    
    cardsContainer.appendChild(card);
  });
}

const apiUrl = "https://rickandmortyapi.com/api/character";
fetchAllData(apiUrl);