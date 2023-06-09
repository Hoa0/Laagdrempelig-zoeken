import { uiState } from "./ui.js";
//catalogus script
const api_url_base =
  "https://cors-anywhere.herokuapp.com/https://zoeken.oba.nl/api/v1/search/?q=";
const api_key = "&authorization=d7519ea81ad4e06ab5e5dac46ddeb63a";
const api_output = "&output=json";
const api_pagesize = "&pagesize=5";
const searchResults = document.getElementById("searchResults");
let categories = [
  { name: "Boeken", facet: "&facet=type(book)&refine=true" },
  { name: "Dvds", facet: "&facet=type(movie)&refine=true" },
  { name: "Activiteiten", facet: "%20table:Activiteiten&refine=true" },
  { name: "Cursussen", facet: "%20table:jsonsrc&refine=true" },
];

/**
 * Function to fetch search results from the API
 * @param {string} searchTerm
 * @param {string} facet
 * @returns
 */
async function getResults(searchTerm, facet = "") {
  const api_url =
    api_url_base + searchTerm + facet + api_pagesize + api_key + api_output;

  try {
    uiState("loading"); // Set UI state to "loading"
    const response = await fetch(api_url, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });

    if (response.ok) {
      uiState("hide");
      const data = await response.json();
      return data.results;
    } else {
      console.error(
        "Error fetching data:",
        response.status,
        response.statusText
      );
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

// Function to display search results in the UI
function showResults(category, results) {
  const article = document.createElement("article");
  const title = document.createElement("h2");
  title.textContent = category;
  title.classList.add("catalogTitle");
  article.appendChild(title);

  const resultContainer = document.createElement("div");
  resultContainer.classList.add("searchResultsItems");

  // Container for item details
  const itemDetailsContainer = document.createElement("div");
  itemDetailsContainer.classList.add("detailsCatalogus");

  results.forEach((result) => {
    const img = document.createElement("img");
    let imageUrl = "";

    if (result.coverimages && result.coverimages[1]) {
      imageUrl = result.coverimages[1];
    } else if (result.coverimages && result.coverimages[0]) {
      imageUrl = result.coverimages[0].replace("{0}", "l");
    } else {
      imageUrl = "fallback.png";
    }

    img.src = imageUrl;
    img.alt = result.titles[0];
    img.onerror = function () {
      this.onerror = null;
      this.src = "fallback.png";
    };

    const resultItem = document.createElement("article");
    resultItem.tabIndex = 0;
    const resultTitle = document.createElement("h2");
    resultTitle.textContent = result.titles[0];

    const author = document.createElement("h3");
    author.textContent = result.authors ? result.authors[0] : "";

    resultContainer.appendChild(resultItem);
    resultItem.appendChild(img);
    resultItem.appendChild(resultTitle);
    resultItem.appendChild(author);

    // Add click event listener to show item details
    resultItem.addEventListener("click", () => {
      let detailsArticle = resultItem.querySelector(
        "article.itemDetailCatalogus"
      );

      // Create item details article if it doesn't exist
      if (!detailsArticle) {
        detailsArticle = document.createElement("div");
        detailsArticle.classList.add("itemDetailCatalogus");
        itemDetailsContainer.appendChild(detailsArticle);
      }

      // Clear existing content
      detailsArticle.innerHTML = "";

      const itemDetails = [
        { img: img.src },
        { text: `${result.titles[0]}` },
        { text: `${result.authors ? result.authors[0] : "Onbekend"}` },
        {
          text: `Samenvatting: ${
            result.summaries && result.summaries.length > 0
              ? result.summaries[0]
              : "Niet beschikbaar"
          }`,
        },
        { text: `Talen: ${result.languages}` },
        { text: `Uitgever: ${result.publisher}` },
        { text: "Delen", link: result.detailLink },
      ];

      const figure = document.createElement("figure");
      const catalogusDetails = document.createElement("article");
      const itemButtons = document.createElement("div");
      itemButtons.classList.add("itemButtons");

      itemDetails.forEach((item, index) => {
        if (item.img) {
          const imgElement = document.createElement("img");
          imgElement.src = item.img;
          imgElement.alt = result.titles[0];
          figure.appendChild(imgElement);
          detailsArticle.appendChild(figure);
        } else if (item.link) {
          const button = document.createElement("button");
          button.innerHTML = `${item.text}`;
          button.setAttribute("title", "Klik om te delen!");
          button.innerHTML += `<i class="material-icons">&#xe80d;</i>`;
          button.classList.add("shareLink");

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
            const chatElement = document.getElementById("chatMessage");
            chatElement.scrollTop = chatElement.scrollHeight;
          });

          // favobutton
          const favoButton = document.createElement("button");
          favoButton.innerHTML = "<span>&#9829;</span>Favoriet"; // Replace "Another Button" with the desired content
          favoButton.classList.add("itemFavo");
          favoButton.setAttribute("title", "Opslaan als favoriet");

          favoButton.addEventListener("click", () => {
            uiState("notAvailable");
            
            // Scroll to the bottom of the "chat" element
            const chatElement = document.getElementById("chatMessage");
            chatElement.scrollTop = chatElement.scrollHeight;
          });

          favoButton.setAttribute("tabindex", "0");
          itemButtons.appendChild(button);
          itemButtons.appendChild(favoButton);
          catalogusDetails.appendChild(itemButtons);
        } else {
          if (index === 1) {
            const h2 = document.createElement("h2");
            h2.textContent = item.text;
            h2.setAttribute("tabindex", "0"); // Add tabindex attribute for tab navigation
            catalogusDetails.appendChild(h2);
          } else if (index === 2) {
            const h3 = document.createElement("h3");
            h3.textContent = item.text;
            h3.setAttribute("tabindex", "0"); // Add tabindex attribute for tab navigation
            catalogusDetails.appendChild(h3);
          } else {
            const p = document.createElement("p");
            p.textContent = item.text;
            p.setAttribute("tabindex", "0"); // Add tabindex attribute for tab navigation
            catalogusDetails.appendChild(p);
          }
        }
      });

      detailsArticle.appendChild(figure);
      detailsArticle.appendChild(catalogusDetails);

      const lastResultDetail = detailsArticle.lastElementChild;
      lastResultDetail.scrollIntoView({ behavior: "smooth", block: "end" });
    });
  });

  article.appendChild(resultContainer);
  searchResults.appendChild(article);

  // Append itemDetailsContainer outside the article
  searchResults.appendChild(itemDetailsContainer);

  const lastResult = searchResults.lastElementChild;
  lastResult.scrollIntoView({ behavior: "smooth", block: "end" });
}

/**
 * This code adds a click event listener to each element with the class "catalogusButton"
 * and performs a search based on the selected category when the button is clicked.
 * If search results are found, they are displayed and additional HTML elements are appended to the page
 */
document.addEventListener("DOMContentLoaded", () => {
  const searchButtons = document.querySelectorAll(".catalogusButton");

  searchButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      button.style.fontWeight = "bold";
      const category = button.dataset.category;
      const facet = getCategoryFacet(category);
      const searchTerm = "*"; // Enter desired search term here

      const results = await getResults(searchTerm, facet);
      console.log(await results);

      if (results.length > 0) {
        searchResults.innerHTML +=
          '<div class="message" tabindex="0"><p>' + category + "</p></div>";

        searchResults.innerHTML +=
          '<div class="speechOba" tabindex="0"><p tabindex="0"> Wat leuk dat je informatie wilt vinden uit ons overzicht! Hier zijn de resultaten die ik voor je heb gevonden: ' +
          category;
        searchResults.innerHTML +=
          '<div class="speechOba" tabindex="0"><p tabindex="0">Kan ik nog iets voor je zoeken?</p></div>';
        // Resultaten weergeven met titel bovenaan
        showResults(category, results);
      } else {
        searchResults.innerHTML +=
        '<div class="message" tabindex="0"><p>' + category + "</p></div>";
        searchResults.innerHTML +=
          '<div class="speechOba" tabindex="0"><p> Helaas geen resultaten gevonden voor ' + category + ", Kan ik nog iets voor je zoeken?</p></div>";
      }
    });
  });
});

// Function to get facet for the given category
function getCategoryFacet(category) {
  const foundCategory = categories.find(
    (catalogus) => catalogus.name === category
  );
  return foundCategory ? foundCategory.facet : "";
}
