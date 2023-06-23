const catalogusBtn = document.querySelectorAll(".catalogusButton");

catalogusBtn.forEach((button) => {
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

            // Voeg de titel (h3) toe aan de category-container
            const containerTitle = document.createElement("h3");
            containerTitle.textContent = category;
            document.getElementById(category + "Container").prepend(containerTitle);

            // Geef de reden waarom de gebruiker heeft geklikt weer in de chat
            const chatMessagesUser = document.getElementById("chatListUser");
            const chatMessage = document.createElement("li");
            chatMessagesUser.style.display = "block";
            chatMessage.className = "chat-message user";
            chatMessage.innerHTML = '<span>Ik wil informatie vinden over: ' + category + "</span>";
            chatMessagesUser.appendChild(chatMessage);
        } else {
            document.getElementById(category + "Container").style.display = "none";
            console.log("No results found");
        }
    });
    // chatMessagesUl.scrollTop = chatMessagesUl.scrollHeight;
});

function getCategoryFacet(category) {
    const foundCategory = categories.find(
        (catalogus) => catalogus.name === category
    );
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
        item.className = "result-item";
        item.appendChild(title);
        item.appendChild(author);
        item.appendChild(img);

        resultsContainer.appendChild(item);
    });
}

let categories = [
    { name: "boeken", facet: "&facet=type(book)&refine=true" },
    { name: "dvds", facet: "&facet=type(movie)&refine=true" },
    { name: "activiteiten", facet: "%20table:Activiteiten&refine=true" },
    { name: "cursussen", facet: "%20table:jsonsrc&refine=true" },
];
