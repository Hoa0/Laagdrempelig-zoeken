import { uiState } from "./ui.js";

// Function to set tabindex to 0 for all elements
const setTabindexToZero = () => {
  const elements = document.querySelectorAll("*");
  elements.forEach((element) => {
    element.setAttribute("tabindex", "0");
  });
};

// Call the function to set tabindex to 0
setTabindexToZero();

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
  const {
    titles,
    authors,
    coverimages,
    languages,
    publisher,
    summaries,
    detailLink,
  } = result;

  // Assign default values if properties are undefined or empty
  const title = titles && titles.length > 0 ? titles[0] : "Onbekende titel";
  const author =
    authors && authors.length > 0 ? authors[0] : "Onbekende auteur";
  const img =
    coverimages[1] !== undefined ? coverimages[1] : "./img/placeholder.png";
  const language = languages;
  const summariesText =
    summaries && summaries.length > 0 ? summaries[0] : "Niet beschikbaar";
  const detailLinks = detailLink;

  // Create the result item element
  const resultItem = document.createElement("article");
  resultItem.innerHTML = `<img src='${img}'> <h2>${title}</h2><h3>${author}</h3>`;
  resultItem.setAttribute("tabindex", "0"); // Add tabindex attribute for tab navigation

  // Add click event listener to show item details
  resultItem.addEventListener("click", () => {
    const itemDetails = [
      { img: img },
      { text: `${title}` },
      { text: `${author}` },
      { text: `Samenvatting: ${summariesText}` },
      { text: `Talen: ${language}` },
      { text: `Uitgever: ${publisher}` },
      { text: "Delen", link: detailLinks },
    ];

    const detailsDiv = document.createElement("article");

    itemDetails.forEach((item, index) => {
      if (item.img) {
        const imgElement = document.createElement("img");
        imgElement.src = item.img;
        detailsDiv.appendChild(imgElement);
        detailsDiv.setAttribute("tabindex", "0");
      } else if (item.link) {
        const button = document.createElement("button");
        button.innerHTML = `${item.text}`;
        button.setAttribute("title", "Klik om te delen!");
        button.innerHTML += `<i class="material-icons">&#xe80d;</i>`;
        button.addEventListener("click", () => {
          navigator.clipboard
            .writeText(item.link)
            .then(() => {
              console.log("Link copied to clipboard:", item.link);
              // Provide user feedback or perform other actions after successful copy
              uiState("copied");
            })
            .catch((error) => {
              console.error("Failed to copy link:", error);
              // Handle the error or provide user feedback
              uiState("noLink");
            });

          // Scroll to the bottom of the "chat" element
          const chatElement = document.getElementById("chat");
          chatElement.scrollTop = chatElement.scrollHeight;
        });
        button.setAttribute("tabindex", "0"); // Add tabindex attribute for tab navigation
        detailsDiv.appendChild(button);
      } else {
        if (index === 1) {
          const h2 = document.createElement("h2");
          h2.textContent = item.text;
          h2.setAttribute("tabindex", "0"); // Add tabindex attribute for tab navigation
          detailsDiv.appendChild(h2);
        } else if (index === 2) {
          const h3 = document.createElement("h3");
          h3.textContent = item.text;
          h3.setAttribute("tabindex", "0"); // Add tabindex attribute for tab navigation
          detailsDiv.appendChild(h3);
        } else {
          const p = document.createElement("p");
          p.textContent = item.text;
          p.setAttribute("tabindex", "0"); // Add tabindex attribute for tab navigation
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

  //container for grid elements
  const resultContainer = document.createElement("div");
  resultContainer.classList.add("searchResultsItems");

  itemsToLoad.forEach((result, index) => {
    const resultItem = createResultItem(result);
    // resultItem.setAttribute('tabindex', currentIndex + index + 1); // Assign tabindex based on the current index
    resultContainer.appendChild(resultItem);
    loadMoreButton.style.display = "block";
  });

  searchResults.appendChild(resultContainer);

  //scroll animation
  const lastResult = searchResults.lastElementChild;
  lastResult.scrollIntoView({ behavior: "smooth", block: "end" });
  
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
      // searchResults.innerHTML = "";
      input.value = "";

      if (responseData.data) {
        // Clean up and store the response data for later use
        function removeSpaceFromString(dataThatHasBeenStringified) {
          return dataThatHasBeenStringified.substring(1);
        }
        responseDataSet = JSON.parse(removeSpaceFromString(dirtySet));

        localStorage.setItem(
          "responseDataSet",
          JSON.stringify(responseDataSet)
        );

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
