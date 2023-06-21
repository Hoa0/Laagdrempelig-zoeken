import { uiState } from "./ui.js";

const searchForm = document.getElementById("searchForm");
// Create the chatMessages element dynamically
const chatMessages = document.createElement("ul");
chatMessages.id = "chatMessages";

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent default form submission
  // TODO: scrolltop + scroll height
  // const chatContainer = document.getElementById("chat");
  // chatContainer.scrollTop = chatContainer.scrollHeight;
  const searchResults = document.getElementById("searchResults");
  const itemDetailsDiv = document.getElementById("itemDetails");
  const input = document.getElementById("query");
  const userInput = input.value;

  const message = document.createElement("li");
  message.classList.add("message");
  message.textContent = userInput;
  chatMessages.appendChild(message);

  const resultsContainer = document.querySelector(".results-container");
  // Append the chatMessages element to the resultsContainer
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
        /** @description removes the first string character. Reason for the function is that the dataset received is being tossed around between stringify and parse, adding an empty character within the body of the results key */
        function RemoveSpaceFromString(dataThatHasBeenStringified) {
          return dataThatHasBeenStringified.substring(1);
        }
        let responseDataSet = JSON.parse(RemoveSpaceFromString(dirtySet));
        console.log(responseDataSet);

        // Display the search results
        responseDataSet.results.forEach((result) => {
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
          resultItem.innerHTML = `<img src='${img}'> <p>Titel: ${title}</p><p>Auteur: ${author}</p>`;
          // Append the result item to the search results
          searchResults.appendChild(resultItem);

          resultItem.addEventListener("click", () => {
            const itemDetails = [
              { img: img },
              { text: `Titel: ${title}` },
              { text: `Auteur: ${author}` },
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
          })          

          searchResults.appendChild(resultItem);
          // resultsContainer.scrollTop = resultsContainer.scrollHeight;
        });
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
