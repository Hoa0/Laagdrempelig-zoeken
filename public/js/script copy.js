/* eslint-disable no-undef */
const button = document.getElementById("btnBook");
const texts = document.getElementsByClassName("showResult");
const content = document.querySelector("#content");
const obaHelper = document.getElementById("svgHelp");
const contentChat = document.getElementById("chat");
const apiData = "https://raw.githubusercontent.com/Hoa0/Laagdrempelig-zoeken/15-prototype-wk-3/kokenData.json";

button.addEventListener("click", function () {
    for (let i = 0; i < texts.length; i++) {
        texts[i].style.display = "block";
    }
    gsap.from(texts, { duration: 1, y: 30, opacity: 0 });

    fetch(apiData)
        .then(response => response.json())
        .then(data => {
            const results = data.results;
            const resultCount = 2; // Het gewenste aantal resultaten

            // Bouw een HTML-fragment met de gegevens
            let html = "";
            for (let i = 0; i < resultCount; i++) {
                const result = results[i];
                const title = result.titles[0];
                const author = result.authors[0];
                const image = result.coverimages[0];

                html += "<h2>" + title + "</h2>";
                html += "<p>Auteur: " + author + "</p>";
                html += "<img src=\"" + image + "\"alt=\"Cover\" width=\"200\">";
            }

            // Plaats het HTML-fragment in de container
            document.getElementById("dataContainer").innerHTML = html;
        })
        .catch(error => {
            console.log("Fout bij het laden van het JSON-bestand:", error);
        });
});

function animation() {
    gsap.from(content, { opacity: 0, duration: 1, y: -50 });
    gsap.from(obaHelper, { duration: 1, y: 30, opacity: 0 });
    gsap.from(contentChat, { duration: 1, y: 30, opacity: 0 });
}

animation();


