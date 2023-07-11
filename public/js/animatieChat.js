function animateGSAP() {
    // Controleer of de animatie al is uitgevoerd
    if (animateGSAP.executed) {
        return;
    }
    const categorieBtn = document.getElementById("speechBtnCateg");
    const nav = document.getElementsByTagName("header");
    const titleChat = document.getElementById("chatTitleContainer");
    const contentChat = document.getElementById("chat");

    // Hiding elements by default with CSS
    gsap.set(categorieBtn, {
        opacity: 0
    });

    // Animatie voor het "categorieBtn" element
    gsap.to(categorieBtn, {
        duration: 0.5,
        delay: 2,
        opacity: 1,
    });

    function animation() {
        gsap.from(nav, {
            duration: 1,
            y: 30,
            opacity: 0
        });
        gsap.from(titleChat, {
            duration: 1,
            y: 30,
            opacity: 0
        });
        gsap.from(contentChat, {
            duration: 1,
            y: 30,
            opacity: 0
        });
    }

    animation();

    // Markeer de animatie als uitgevoerd
    animateGSAP.executed = true;
}

animateGSAP();