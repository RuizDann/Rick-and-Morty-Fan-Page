// API URL
let api_url = 'https://rickandmortyapi.com/api/episode?page=1';

// Function to make an API request and display data
async function getapi(url) {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      show(data);
    } else {
      console.error('API request failed with status: ' + response.status);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Initial API request
getapi(api_url);

// Function to generate the HTML table
function show(data) {
  let table = `
    <tr>
        <th>Episode</th>
        <th>Name</th>
        <th>Air Date</th>
        <th>Episode</th>
        <th>Characters</th>
    </tr>`;

  for (let episode of data.results) {
    for (let key in episode) {
      if (episode[key] == '' || episode[key] == null) {
        episode[key] = 'N/A';
      }
    }

    table += `<tr>
        <td>${episode.episode}</td>
        <td>${episode.name}</td>
        <td>${episode.air_date}</td>
        <td>${episode.episode}</td>
        <td>${episode.characters.length}</td>
    </tr>`;
  }

  // Add navigation buttons
  table += `<tr>
        <td colspan="5">
            <button id="prevBtn" onclick="previousPage()">Previous</button>
            <button id="nextBtn" onclick="nextPage()">Next</button>
        </td>
    </tr>`;

  document.getElementById('episodes').innerHTML = table;
  document.getElementById('episodes').createCaption().innerHTML = 'Episodes Table ' + parseInt(api_url.match(/\d+$/)[0]);
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
