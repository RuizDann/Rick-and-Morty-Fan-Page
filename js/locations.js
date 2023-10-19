// API URL
let api_url = 'https://rickandmortyapi.com/api/location?page=1';

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
        <th>Name</th>
        <th>Type</th>
        <th>Dimension</th>
        <th>Residents</th>
    </tr>`;

  for (let location of data.results) {
    for (let key in location) {
      if (location[key] == '' || location[key] == null) {
        location[key] = 'N/A';
      }
    }

    table += `<tr>
        <td>${location.name}</td>
        <td>${location.type}</td>
        <td>${location.dimension}</td>
        <td>${location.residents.length}</td>
    </tr>`;
  }

  // Add navigation buttons
  table += `<tr>
        <td colspan="4">
            <button id="prevBtn" onclick="previousPage()">Previous</button>
            <button id="nextBtn" onclick="nextPage()">Next</button>
        </td>
    </tr>`;

  document.getElementById('locations').innerHTML = table;
  document.getElementById('locations').createCaption().innerHTML = 'Locations Table ' + parseInt(api_url.match(/\d+$/)[0]);
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