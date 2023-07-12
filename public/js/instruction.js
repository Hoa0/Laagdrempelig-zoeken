//DOM - show modal
const modelBtn = document.getElementById("helpBtn");
// DOM - content modal laten zien van insctructies 
const buttons = document.querySelectorAll(".instructionsButtons");
// DOM - content uitleg met images 
const vorigeBtn = document.getElementById("vorige");
const volgendeBtn = document.getElementById("volgende");
const contents = document.getElementsByClassName("contentImages");
let currentIndex = 0;
// DOM begin bescherm, lees meer over de catalogus buttons laten zien 
const readMoreBtn = document.querySelector('.readMoreBtn');
const hiddenContent = document.querySelector('.hiddenCatalogus');

/** show modal functies en sluiten ervan*/
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


// Functie om de huidige content te tonen - uitleg images tonen
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

/**
 * Functie om lees en lees minder button
 * begin bescherm, lees meer om vervolgens de catalogus buttons te laten zien 
 */
readMoreBtn.addEventListener('click', () => {
    hiddenContent.classList.toggle('hiddenCatalogus');
    if (hiddenContent.classList.contains('hiddenCatalogus')) {
        setTimeout(() => {
            hiddenContent.style.display = 'none';
        }, 250); // Wacht 250 milliseconden voordat de display op 'none' wordt gezet
        readMoreBtn.textContent = 'Lees meer';
    } else {
        hiddenContent.style.display = 'block';
        setTimeout(() => {
            hiddenContent.style.opacity = 1;
        }, 0); // Wacht 0 milliseconden voordat de opacity op 1 wordt gezet
        readMoreBtn.textContent = 'Lees minder';
    }
});