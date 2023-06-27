//catalogus script
const api_url_base = "https://cors-anywhere.herokuapp.com/https://zoeken.oba.nl/api/v1/search/?q=";
const api_key = "&authorization=d7519ea81ad4e06ab5e5dac46ddeb63a";
const api_output = "&output=json";
const api_pagesize = "&pagesize=5";
const message = document.getElementById("searchResults");
// const catalogusBtn = document.querySelectorAll(".catalogusButton");
let categories = [
    { name: "boeken", facet: "&facet=type(book)&refine=true" },
    { name: "dvds", facet: "&facet=type(movie)&refine=true" },
    { name: "activiteiten", facet: "%20table:Activiteiten&refine=true" },
    { name: "cursussen", facet: "%20table:jsonsrc&refine=true" },
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
    // Titel boven de resultaten
    const title = document.createElement("h2");
    title.textContent = category;
    message.appendChild(title);

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

        const title = document.createElement("p");
        title.textContent = result.titles[0];

        const author = document.createElement("p");
        author.textContent = result.authors ? result.authors[0] : "Unknown Author";

        const item = document.createElement("div");
        item.className = "result-item bot";
        item.appendChild(title);
        item.appendChild(author);
        item.appendChild(img);

        message.appendChild(item);
    });
    // Scroll naar de onderkant van de resultaten
    const lastResult = message.lastElementChild;
    lastResult.scrollIntoView({ behavior: "smooth", block: "end" });
}


//buttons catalogus
// const categoryContainers = document.querySelectorAll(".category-container");
// categoryContainers.forEach((container) => {
//     container.style.display = "none";
// });

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
                message.innerHTML
                    += '<div class="chat-message bot"><span>Hier zijn de resultaten van je zoekvraag voor ' + category + ' kan ik nog iets voor je zoeken?</span></div>';
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