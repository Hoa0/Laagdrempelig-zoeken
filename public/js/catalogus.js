//catalogus script
const api_url_base = "https://cors-anywhere.herokuapp.com/https://zoeken.oba.nl/api/v1/search/?q=";
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

async function getResults(searchTerm, facet = "") {
   const api_url = api_url_base + searchTerm + facet + api_pagesize + api_key + api_output;

   try {
       const response = await fetch(api_url, {
           headers: {
               "X-Requested-With": "XMLHttpRequest",
           },
       });

       if (response.ok) {
           const data = await response.json();
           return data.results;
       } else {
           console.error("Error fetching data:", response.status, response.statusText);
           return [];
       }
   } catch (error) {
       console.error("Error fetching data:", error);
       return [];
   }
}

function showResults(category, results) {
   const article = document.createElement("article"); // Maak een nieuw 'article'-element

   const title = document.createElement("h2");
   title.textContent = category;
   title.classList.add("catalogTitle");
   article.appendChild(title);

   const resultContainer = document.createElement("div"); // Maak een 'div'-element voor de resultaten, alle resultaten weergaven kom hierin te staan
   resultContainer.classList.add("searchResultsItems");

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

       const resultItem = document.createElement("article"); // Maak een 'article'-element voor elk resultaat
       const resultTitle = document.createElement("h2"); // Gebruik 'h2' voor de titel van elk resultaat
       resultTitle.textContent = result.titles[0];

       const author = document.createElement("h3"); // Gebruik 'h3' voor de auteur van elk resultaat
       author.textContent = result.authors ? result.authors[0] : "";

       resultContainer.appendChild(resultItem);
       resultItem.appendChild(img);
       resultItem.appendChild(resultTitle);
       resultItem.appendChild(author);
   });

   article.appendChild(resultContainer);
   searchResults.appendChild(article);
   const lastResult = searchResults.lastElementChild;
   lastResult.scrollIntoView({ behavior: "smooth", block: "end" });
}

document.addEventListener("DOMContentLoaded", () => {
   const searchButtons = document.querySelectorAll(".catalogusButton");

   searchButtons.forEach((button) => {
       button.addEventListener("click", async () => {
           const category = button.dataset.category;
           const facet = getCategoryFacet(category);
           const searchTerm = "*"; // Voer hier de gewenste zoekterm in

           const results = await getResults(searchTerm, facet);
           console.log(await results);

           if (results.length > 0) {
               searchResults.innerHTML
                   += '<div class="message"><p>' + category + '</p></div>';

               searchResults.innerHTML
                   += '<div class="speechOba"><p>Wat leuk dat je informatie wilt vinden uit ons overzicht! Hier zijn de resultaten die ik voor je heb gevonden: ' + category + '. Kan ik nog iets voor je zoeken?</p></div>';
               // Resultaten weergeven met titel bovenaan
               showResults(category, results);


           } else {
               console.log("No results found");
           }
       });
   });
});

function getCategoryFacet(category) {
   const foundCategory = categories.find((catalogus) => catalogus.name === category);
   return foundCategory ? foundCategory.facet : "";
}
