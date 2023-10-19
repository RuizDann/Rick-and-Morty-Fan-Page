// API URL
let api_url = "https://rickandmortyapi.com/api/character/?page=1";

// Function to make an API request and display data
async function getapi(url) {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      show(data);
    } else {
      console.error("API request failed with status: " + response.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Initial API request
getapi(api_url);

// Function to generate the HTML table
function show(data) {
  let table = `
    <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Status</th>
        <th>Species</th>
        <th>Type</th>
        <th>Gender</th>
        <th>Origin</th>
        <th>Location</th>
    </tr>`;

  for (let character of data.results) {
    for (let key in character) {
      if (character[key] == "" || character[key] == null) {
        character[key] = 'N/A';
      }
    }

    table += `<tr>
        <td><img src="${character.image}" alt="image"></td>
        <td>${character.name}</td>
        <td>${character.status}</td>
        <td>${character.species}</td>
        <td>${character.type}</td>
        <td>${character.gender}</td>
        <td>${character.origin.name}</td>
        <td>${character.location.name}</td>
    </tr>`;
  }

  // Add navigation buttons
  table += `<tr>
        <td colspan="8">
            <button id="prevBtn" onclick="previousPage()">Previous</button>
            <button id="nextBtn" onclick="nextPage()">Next</button>
        </td>
    </tr>`;

  document.getElementById("characters").innerHTML = table;
  document.getElementById('characters').createCaption().innerHTML = 'Characters Table ' + parseInt(api_url.match(/\d+$/)[0]);
}

// Function to get the next page
function nextPage() {
  api_url = getNextPage(api_url);
  getapi(api_url);
}

// Function to get the previous page
function previousPage() {
  api_url = getPreviousPage(api_url);
  getapi(api_url);
}

// Helper functions for getting next and previous page URLs
function getNextPage(url) {
  const currentPage = parseInt(url.match(/\d+$/)[0]);
  return url.replace(/(\d+)$/, currentPage + 1);
}

function getPreviousPage(url) {
  const currentPage = parseInt(url.match(/\d+$/)[0]);
  if (currentPage > 1) {
    return url.replace(/(\d+)$/, currentPage - 1);
  }
  return url;
}
