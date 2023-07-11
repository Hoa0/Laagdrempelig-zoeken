const modelBtn = document.getElementById("helpBtn");

/** show modal */
function openModal() {
    const target = event.target;
    if (
        target.hasAttribute("data-toggle") &&
        target.getAttribute("data-toggle") === "modal"
    ) {
        if (target.hasAttribute("data-target")) {
            const m_ID = target.getAttribute("data-target");
            document.getElementById(m_ID).classList.add("open");
            event.preventDefault();
        }
    }
}

function closeModal() {
    const target = event.target;
    if (
        (target.hasAttribute("data-dismiss") &&
            target.getAttribute("data-dismiss") === "modal") ||
        target.classList.contains("modal")
    ) {
        const modal = document.querySelector('[class="modal open"]');
        modal.classList.remove("open");
        event.preventDefault();
    }
}

modelBtn.addEventListener("click", openModal);
document.addEventListener("click", closeModal);



/** content */
const buttons = document.querySelectorAll(".instructionsButtons");

// Voeg een klikgebeurtenis toe aan elke knop
buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        // Haal de doelwaarde van de knop op
        const target = this.dataset.target;

        // Haal alle artikelen op met de specifieke class
        const articles = document.querySelectorAll(".content");

        // Verberg alle artikelen
        articles.forEach(function (article) {
            article.style.display = "none";
        });

        // Toon het doelartikel
        document.getElementById(target).style.display = "block";

        // Verwijder de "activeInstructionBtn" klasse van alle knoppen
        buttons.forEach(function (btn) {
            btn.classList.remove("activeInstructionBtn");
        });

        // Voeg de "activeInstructionBtn" klasse toe aan de geklikte knop
        this.classList.add("activeInstructionBtn");
    });
});

/** content uitleg met images */
const vorigeBtn = document.getElementById("vorige");
const volgendeBtn = document.getElementById("volgende");
const contents = document.getElementsByClassName("contentImages");
let currentIndex = 0;

// Functie om de huidige content te tonen
function showContent(index) {
    // Verberg alle contentsecties
    for (let i = 0; i < contents.length; i++) {
        contents[i].classList.remove("activeContentImages");
    }
    // Toon de gewenste contentsectie
    contents[index].classList.add("activeContentImages");
}

// Functie om naar de volgende content te gaan
function nextContent() {
    if (currentIndex < contents.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    showContent(currentIndex);
}

// Functie om naar de vorige content te gaan
function previousContent() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = contents.length - 1;
    }
    showContent(currentIndex);
}

// Voeg klikgebeurtenissen toe aan de knoppen
vorigeBtn.addEventListener("click", previousContent);
volgendeBtn.addEventListener("click", nextContent);

// Toon de eerste content bij het laden van de pagina
showContent(currentIndex);