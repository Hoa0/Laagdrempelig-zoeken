// const message = document.getElementById("chatMessages");
const message = document.getElementById("searchResults");
const catalogusBtn = document.querySelectorAll(".catalogusButton");
let categories = [
    { name: "boeken", facet: "&facet=type(book)&refine=true" },
    { name: "dvds", facet: "&facet=type(movie)&refine=true" },
    { name: "activiteiten", facet: "%20table:Activiteiten&refine=true" },
    { name: "cursussen", facet: "%20table:jsonsrc&refine=true" },
];

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
            imageUrl = result.coverimages[0].replace("{0}", "1");
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



catalogusBtn.forEach((button) => {
    button.addEventListener("click", async () => {
        const category = button.dataset.category;
        const facet = getCategoryFacet(category);
        const searchTerm = "*";

        const response = await fetch(`/catalogus/search/${searchTerm}/${facet}`);
        const results = await response.json();
        console.log(results);

        // Resultaten weergeven
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

function getCategoryFacet(category) {
    const foundCategory = categories.find((catalogus) => catalogus.name === category);
    return foundCategory ? foundCategory.facet : "";
}
