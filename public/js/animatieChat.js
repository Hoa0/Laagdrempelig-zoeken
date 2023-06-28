//GSAP animation script
const typing = document.getElementsByClassName("fallbackTyping");
const categorieBtn = document.getElementById("speechBtnCateg");
const texts = document.getElementsByClassName("showResult");
const nav = document.getElementsByTagName("header")
const titleChat = document.getElementById("chatTitleContainer");
const contentChat = document.getElementById("chat");
const showResults = document.getElementById("searchResults")

// Hiding elements by default with CSS
gsap.set(typing, { opacity: 0 });
gsap.set(categorieBtn, { opacity: 0 });

// Animatie for "typing" element
gsap.to(typing, {
    duration: 0.5,
    delay: 3,
    opacity: 1,
    onComplete: function () {
        // Na 4 seconden de onComplete-functie uitvoeren (blijven staan)
        gsap.to(typing, {
            duration: 0.5,
            delay: 4,
            opacity: 0,
            display: "none"
        });
    }
});

// Animatie voor het "categorieBtn" element
gsap.to(categorieBtn, {
    duration: 0.5,
    delay: 7,
    opacity: 1
});


gsap.to(showResults, {
    duration: 0.5,
    delay: 1,
    opacity: 1
});

function animation() {
    gsap.from(nav, { duration: 1, y: 30, opacity: 0 });
    gsap.from(titleChat, { duration: 1, y: 30, opacity: 0 });
    gsap.from(contentChat, { duration: 1, y: 30, opacity: 0 });
    gsap.from(showResults, { duration: 1, y: 30, opacity: 0 });
}

animation();