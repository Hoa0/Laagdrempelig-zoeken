// public/js/catalogus.js
const searchButtons = document.querySelectorAll(".searchButton");

searchButtons.forEach((button) => {
    button.addEventListener("click", async () => {
        const category = button.dataset.category;
        const facet = getCategoryFacet(category);
        const searchTerm = "*"; // Voer hier de gewenste zoekterm in

        const response = await fetch(`/catalogus/search/${searchTerm}/${facet}`);
        const results = await response.json();
        console.log(results);

        if (results.length > 0) {
            showResults(category, results);
            document.getElementById(category + "Container").style.display = "block";
        } else {
            document.getElementById(category + "Container").style.display = "none";
            console.log("No results found");
        }
    });
});

function getCategoryFacet(category) {
    const foundCategory = categories.find((catalogus) => catalogus.name === category);
    return foundCategory ? foundCategory.facet : "";
}

function showResults(category, results) {
    const resultsContainer = document.getElementById(category + "Results");
    resultsContainer.innerHTML = "";

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

        let detailLink = result.detailLink;
        if (!detailLink) {
            detailLink = result.detaillink;
        }

        const link = document.createElement("a");
        link.href = detailLink.replace("http:", "https:");
        link.target = "_blank";
        link.appendChild(img);

        const item = document.createElement("div");
        item.className = "result-item";
        item.appendChild(link);

        resultsContainer.appendChild(item);
    });
}
let categories = [
    { name: "boeken", facet: "&facet=type(book)&refine=true" },
    { name: "dvds", facet: "&facet=type(movie)&refine=true" },
    { name: "activiteiten", facet: "%20table:Activiteiten&refine=true" },
    { name: "cursussen", facet: "%20table:jsonsrc&refine=true" },
]