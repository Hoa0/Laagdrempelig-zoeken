import { uiState } from "./ui.js";

const searchForm = document.getElementById("searchForm");
const chatMessages = document.createElement("ul");
chatMessages.id = "chatMessages";
const searchResults = document.getElementById("searchResults");
const itemDetailsDiv = document.getElementById("itemDetails");
const loadMoreButton = document.getElementById("loadMoreButton");

let currentIndex = 0;
const itemsPerLoad = 5;
let responseDataSet;

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  currentIndex = 0;
  const input = document.getElementById("query");
  const userInput = input.value;

  const message = document.createElement("li");
  message.classList.add("message");
  message.textContent = userInput;
  chatMessages.appendChild(message);

  const resultsContainer = document.querySelector(".results-container");
  resultsContainer.appendChild(chatMessages);

  try {
    uiState("loading");
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

      if (await responseData.data) {
        function RemoveSpaceFromString(dataThatHasBeenStringified) {
          return dataThatHasBeenStringified.substring(1);
        }
        responseDataSet = JSON.parse(
          RemoveSpaceFromString(dirtySet)
        );

        localStorage.setItem(
          "responseDataSet",
          JSON.stringify(responseDataSet)
        );

        const itemsToLoad = responseDataSet.results.slice(
          currentIndex,
          currentIndex + itemsPerLoad
        );

        itemsToLoad.forEach((result) => {
          const title =
            result.titles && result.titles.length > 0
              ? result.titles[0]
              : "Onbekende titel";
          const author =
            result.authors && result.authors.length > 0
              ? result.authors[0]
              : "Onbekende auteur";
          const img =
            result.coverimages[1] !== undefined
              ? result.coverimages[1]
              : "./img/placeholder.png";
          const language = result.languages;
          const publisher = result.publisher;
          const summaries =
            result.summaries && result.summaries.length > 0
              ? result.summaries[0]
              : "Niet beschikbaar";

          const resultItem = document.createElement("div");
          resultItem.innerHTML = `<img src='${img}'> <p>${title}</p><p>${author}</p>`;

          resultItem.addEventListener("click", () => {
            const itemDetails = [
              { img: img },
              { text: `${title}` },
              { text: `${author}` },
              { text: `Samenvatting: ${summaries}` },
              { text: `Talen: ${language}` },
              { text: `Uitgever: ${publisher}` },
            ];

            const detailsDiv = document.createElement("div");

            itemDetails.forEach((item) => {
              if (item.img) {
                const imgElement = document.createElement("img");
                imgElement.src = item.img;
                detailsDiv.appendChild(imgElement);
              } else {
                const p = document.createElement("p");
                p.textContent = item.text;
                detailsDiv.appendChild(p);
              }
            });

            itemDetailsDiv.appendChild(detailsDiv);
          });

          searchResults.appendChild(resultItem);
        });

        currentIndex += itemsPerLoad;

        if (currentIndex >= responseDataSet.results.length) {
          loadMoreButton.style.display = "none";
        } else {
          loadMoreButton.style.display = "block";
        }

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
});

loadMoreButton.addEventListener("click", () => {
  const storedDataSet = localStorage.getItem("responseDataSet");

  if (storedDataSet) {
    responseDataSet = JSON.parse(storedDataSet);
  }

  const itemsToLoad = responseDataSet.results.slice(
    currentIndex,
    currentIndex + itemsPerLoad
  );

  itemsToLoad.forEach((result) => {
    const title =
      result.titles && result.titles.length > 0
        ? result.titles[0]
        : "Onbekende titel";
    const author =
      result.authors && result.authors.length > 0
        ? result.authors[0]
        : "Onbekende auteur";
    const img =
      result.coverimages[1] !== undefined
        ? result.coverimages[1]
        : "./img/placeholder.png";
    const language = result.languages;
    const publisher = result.publisher;
    const summaries =
      result.summaries && result.summaries.length > 0
        ? result.summaries[0]
        : "Niet beschikbaar";

    const resultItem = document.createElement("div");
    resultItem.innerHTML = `<img src='${img}'> <p>${title}</p><p>${author}</p>`;

    resultItem.addEventListener("click", () => {
      const itemDetails = [
        { img: img },
        { text: `${title}` },
        { text: `${author}` },
        { text: `Samenvatting: ${summaries}` },
        { text: `Talen: ${language}` },
        { text: `Uitgever: ${publisher}` },
      ];

      const detailsDiv = document.createElement("div");

      itemDetails.forEach((item) => {
        if (item.img) {
          const imgElement = document.createElement("img");
          imgElement.src = item.img;
          detailsDiv.appendChild(imgElement);
        } else {
          const p = document.createElement("p");
          p.textContent = item.text;
          detailsDiv.appendChild(p);
        }
      });

      itemDetailsDiv.appendChild(detailsDiv);
    });

    searchResults.appendChild(resultItem);
  });

  currentIndex += itemsPerLoad;

  if (currentIndex >= responseDataSet.results.length) {
    loadMoreButton.style.display = "none";
  }
});
