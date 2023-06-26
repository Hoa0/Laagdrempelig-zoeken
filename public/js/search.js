import { uiState } from "./ui.js";

// Get DOM elements
const searchForm = document.getElementById("searchForm");
const chatMessages = document.createElement("ul");
chatMessages.id = "chatMessages";
const searchResults = document.getElementById("searchResults");
const itemDetailsDiv = document.getElementById("itemDetails");
const loadMoreButton = document.getElementById("loadMoreButton");

// Initialize variables
let currentIndex = 0;
const itemsPerLoad = 5;
let responseDataSet;

// Function to create a chat message element
const createMessage = (text) => {
  const message = document.createElement("li");
  message.classList.add("message");
  message.textContent = text;
  return message;
};

// Function to create a search result item element
const createResultItem = (result) => {
  // Destructure properties from the result object
  const { titles, authors, coverimages, languages, publisher, summaries } = result;
  
  // Assign default values if properties are undefined or empty
  const title = titles && titles.length > 0 ? titles[0] : "Onbekende titel";
  const author = authors && authors.length > 0 ? authors[0] : "Onbekende auteur";
  const img = coverimages[1] !== undefined ? coverimages[1] : "./img/placeholder.png";
  const language = languages;
  const summariesText = summaries && summaries.length > 0 ? summaries[0] : "Niet beschikbaar";

  // Create the result item element
  const resultItem = document.createElement("article");
  resultItem.innerHTML = `<img src='${img}'> <h2>${title}</h2><h3>${author}</h3>`;

  // Add click event listener to show item details
  resultItem.addEventListener("click", () => {
    const itemDetails = [
      { img: img },
      { text: `${title}` },
      { text: `${author}` },
      { text: `Samenvatting: ${summariesText}` },
      { text: `Talen: ${language}` },
      { text: `Uitgever: ${publisher}` },
    ];

    const detailsDiv = document.createElement("article");

    itemDetails.forEach((item, index) => {
      if (item.img) {
        const imgElement = document.createElement("img");
        imgElement.src = item.img;
        detailsDiv.appendChild(imgElement);
      } else {
        if (index === 1) {
          const h2 = document.createElement("h2");
          h2.textContent = item.text;
          detailsDiv.appendChild(h2);
        } else if (index === 2) {
          const h3 = document.createElement("h3");
          h3.textContent = item.text;
          detailsDiv.appendChild(h3);
        } else {
          const p = document.createElement("p");
          p.textContent = item.text;
          detailsDiv.appendChild(p);
        }
      }
    });

    itemDetailsDiv.appendChild(detailsDiv);
  });

  return resultItem;
};

// Function to load items and display them in the search results
const loadItems = () => {
  const itemsToLoad = responseDataSet.results.slice(
    currentIndex,
    currentIndex + itemsPerLoad
  );

  itemsToLoad.forEach((result) => {
    const resultItem = createResultItem(result);
    searchResults.appendChild(resultItem);
    loadMoreButton.style.display = "block";
  });

  currentIndex += itemsPerLoad;

  // Hide the "Load More" button if all items have been loaded
  if (currentIndex >= responseDataSet.results.length) {
    loadMoreButton.style.display = "none";
  } else {
    loadMoreButton.style.display = "block";
  }
};

// Function to handle form submission for search
const handleSearchFormSubmit = async (event) => {
  event.preventDefault();
  currentIndex = 0;
  const input = document.getElementById("query");
  const userInput = input.value;

  // Create and append chat message
  const message = createMessage(userInput);
  chatMessages.appendChild(message);

  const resultsContainer = document.querySelector(".results-container");
  resultsContainer.appendChild(chatMessages);

  try {
    uiState("loading");
    // Send search query to the server
    const response = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: userInput }),
    });

    if (response.ok) {
      const responseData = await response.json();
      const dirtySet = JSON.parse(JSON.stringify(responseData.data));
      searchResults.innerHTML = "";

      if (responseData.data) {
        // Clean up and store the response data for later use
        function removeSpaceFromString(dataThatHasBeenStringified) {
          return dataThatHasBeenStringified.substring(1);
        }
        responseDataSet = JSON.parse(removeSpaceFromString(dirtySet));

        localStorage.setItem("responseDataSet", JSON.stringify(responseDataSet));

        // Load and display the items
        loadItems();
        uiState("loading", input.value);
      } else {
        console.log("No results found.");
        uiState("noData");
      }
    } else {
      const errorMessage = await response.text();
      console.error(errorMessage);
    }
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    uiState("hide", input.value);
  }
};

// Function to handle "Load More" button click
const handleLoadMoreButtonClick = () => {
  const storedDataSet = localStorage.getItem("responseDataSet");

  if (storedDataSet) {
    responseDataSet = JSON.parse(storedDataSet);
  }
  loadItems();
};

// Add event listeners
searchForm.addEventListener("submit", handleSearchFormSubmit);
loadMoreButton.addEventListener("click", handleLoadMoreButtonClick);
