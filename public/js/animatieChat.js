function animateGSAP() {
    // Controleer of de animatie al is uitgevoerd
    if (animateGSAP.executed) {
        return;
    }

    const typing = document.getElementsByClassName("fallbackTyping");
    const categorieBtn = document.getElementById("speechBtnCateg");
    const texts = document.getElementsByClassName("showResult");
    const nav = document.getElementsByTagName("header");
    const titleChat = document.getElementById("chatTitleContainer");
    const contentChat = document.getElementById("chat");
    const showResults = document.getElementById("searchResults");
    const speechInfoType = document.getElementById("speechInfoType");
    const speechInfoChatOba = document.getElementById("speechInfoChatOba");

    // Hiding elements by default with CSS
    gsap.set(typing, { opacity: 0 });
    gsap.set(categorieBtn, { opacity: 0 });
    gsap.set(speechInfoType, { opacity: 0 });
    gsap.set(speechInfoChatOba, { opacity: 0 });

    // Animatie for "typing" element
    gsap.to(typing, {
        duration: 0.5,
        delay: 2,
        opacity: 1,
        onComplete: function () {
            // Na 4 seconden de onComplete-functie uitvoeren (blijven staan)
            gsap.to(typing, {
                duration: 0.5,
                delay: 2,
                opacity: 0,
                display: "none",
            });
        },
    });

    // Animatie voor het "categorieBtn" element
    gsap.to(categorieBtn, {
        duration: 0.5,
        delay: 6,
        opacity: 1,
    });

    gsap.to(speechInfoType, {
        duration: 0.5,
        delay: 7,
        opacity: 1,
    });

    gsap.to(speechInfoChatOba, {
        duration: 0.5,
        delay: 8,
        opacity: 1,
    });

    gsap.to(showResults, {
        duration: 0.5,
        delay: 1,
        opacity: 1,
    });

    function animation() {
        gsap.from(nav, { duration: 1, y: 30, opacity: 0 });
        gsap.from(titleChat, { duration: 1, y: 30, opacity: 0 });
        gsap.from(contentChat, { duration: 1, y: 30, opacity: 0 });
        gsap.from(showResults, { duration: 1, y: 30, opacity: 0 });
    }

    animation();

    // Markeer de animatie als uitgevoerd
    animateGSAP.executed = true;
}

animateGSAP();
