import { loadingIsDone, uiState } from "./ui.js";

const searchForm = document.getElementById("searchForm");
const searchResults = document.getElementById("searchResults");

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent default form submission
  const input = document.getElementById("query");

  try {
    uiState("loading");
    const response = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: input.value }),
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
          const title = result.titles[0];
          const author = result.authors
            ? result.authors[0]
            : "Onbekende auteur";
          const img =
            result.coverimages[1] !== undefined
              ? result.coverimages[1]
              : "./img/placeholder.png";

          const details = result.languages

          const resultItem = document.createElement("div");
          resultItem.innerHTML = `<img src='${img}'> <p>Titel: ${title}</p><p>Auteur: ${author}</p>`;

          resultItem.addEventListener("click", () => {
            const newDiv = document.createElement("div");
            newDiv.textContent = `${details}`;
            searchResults.appendChild(newDiv);
          });

          searchResults.appendChild(resultItem);
          uiState("loading", input.value);
          uiState("results", input.value);
          loadingIsDone();
        });
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
  }
});
