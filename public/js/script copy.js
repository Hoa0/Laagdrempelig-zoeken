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

      if (responseData.data) {
        /** @description removes leading and trailing whitespace characters from the JSON string */
        function RemoveSpaceFromString(dataThatHasBeenStringified) {
          return dataThatHasBeenStringified.trim();
        }

        const responseDataSet = JSON.parse(RemoveSpaceFromString(dirtySet));
        console.log(responseDataSet);

        // Display the search results
        responseDataSet.results.forEach((result) => {
          const title = result.titles[0];
          const author = result.authors ? result.authors[0] : "Onbekende auteur";
          const img = result.coverimages[0];

          const resultItem = document.createElement("div");
          resultItem.innerHTML = `<p>Titel: ${title}</p><p>Auteur: ${author}</p> <img src='${img}'>`;

          searchResults.appendChild(resultItem);
          uiState("loading", input.value);
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
