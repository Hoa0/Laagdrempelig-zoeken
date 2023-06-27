/* eslint-disable no-undef */
const typing = document.getElementsByClassName("fallbackTyping");
const categorieBtn = document.getElementById("speechBtnCateg");
const speechInfoBtn = document.getElementById("speechInfoQ");
const button = document.getElementById("btnBook");
const texts = document.getElementsByClassName("showResult");

const nav = document.getElementsByTagName("nav")
const titleChat = document.getElementById("chatTitleContainer");
const contentChat = document.getElementById("chat");

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

function animation() {
    gsap.from(nav, { duration: 1, y: 30, opacity: 0 });
    gsap.from(titleChat, { duration: 1, y: 30, opacity: 0 });
    gsap.from(contentChat, { duration: 1, y: 30, opacity: 0 });
}

animation();