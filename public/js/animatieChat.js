/* eslint-disable no-undef */
const typing = document.getElementsByClassName("fallbackTyping");
const categorieBtn = document.getElementById("speechBtnCateg");
const speechInfoBtn = document.getElementById("speechInfoQ");
// const button = document.getElementById("btnBook");
const texts = document.getElementsByClassName("showResult");
const svgObaBud = document.getElementById("svgObaBud");
const contentChat = document.getElementById("chat");
const apiData = "https://raw.githubusercontent.com/Hoa0/Laagdrempelig-zoeken/15-prototype-wk-3/kokenData.json";

//
var obaMedewerkerBtn = document.getElementById('obaMedewerker');
var svgHead = document.getElementById('svgObaBud');
var svgOba = document.getElementById('svgOba');
var isHidden = true;
// Elementen standaard verbergen met CSS
gsap.set(typing, { opacity: 0 });
gsap.set(categorieBtn, { opacity: 0 });
gsap.set(speechInfoBtn, { opacity: 0 });

// Animatie voor het "typing" element
gsap.to(typing, {
    duration: 0.5, // animatieduur voor verschijnen
    delay: 3, // vertraging van 3 seconden voor verschijnen
    opacity: 1, // doelwaarde voor dekking (verschijnen)
    onComplete: function () {
        // Na 4 seconden de onComplete-functie uitvoeren (blijven staan)
        gsap.to(typing, {
            duration: 0.5, // animatieduur voor verdwijnen
            delay: 4, // vertraging van 4 seconden voor verdwijnen
            opacity: 0, // doelwaarde voor dekking (verdwijnen)
            display: "none"
        });
    }
});

// Animatie voor het "categorieBtn" element
gsap.to(categorieBtn, {
    duration: 0.5, // animatieduur voor verschijnen
    delay: 7, // vertraging van 7 seconden voor verschijnen
    opacity: 1 // doelwaarde voor dekking (verschijnen)
});

// Animatie voor het "categorieBtn" element
gsap.to(speechInfoBtn, {
    duration: 0.5, // animatieduur voor verschijnen
    delay: 10, // vertraging van 7 seconden voor verschijnen
    opacity: 1 // doelwaarde voor dekking (verschijnen)
});

// button.addEventListener("click", function () {
//     for (let i = 0; i < texts.length; i++) {
//         texts[i].style.display = "block";
//     }
//     gsap.from(texts, { duration: 1, y: 30, opacity: 0 });

//     fetch(apiData)
//         .then(response => response.json())
//         .then(data => {
//             const results = data.results;
//             const resultCount = 2; // Het gewenste aantal resultaten

//             // Bouw een HTML-fragment met de gegevens
//             let html = "";
//             for (let i = 0; i < resultCount; i++) {
//                 const result = results[i];
//                 const title = result.titles[0];
//                 const author = result.authors[0];
//                 const image = result.coverimages[0];

//                 html += "<h2>" + title + "</h2>";
//                 html += "<p>Auteur: " + author + "</p>";
//                 html += "<img src=\"" + image + "\"alt=\"Cover\" width=\"200\">";
//             }

//             // Plaats het HTML-fragment in de container
//             document.getElementById("dataContainer").innerHTML = html;
//         })
//         .catch(error => {
//             console.log("Fout bij het laden van het JSON-bestand:", error);
//         });
// });

function animation() {
    gsap.from(svgObaBud, { duration: 1, y: 30, opacity: 0 });
    gsap.from(contentChat, { duration: 1, y: 30, opacity: 0 });
}

animation();

//


obaMedewerkerBtn.addEventListener('click', function () {
    if (isHidden) {
        svgHead.style.display = 'none';
        svgOba.style.display = 'none';
        isHidden = false;
    } else {
        svgHead.style.display = 'block';
        svgOba.style.display = 'block';
        isHidden = true;
    }
});