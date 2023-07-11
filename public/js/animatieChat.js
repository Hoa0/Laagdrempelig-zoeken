function animateGSAP() {
    // Controleer of de animatie al is uitgevoerd
    if (animateGSAP.executed) {
        return;
    }
    const categorieBtn = document.getElementById("speechBtnCateg");
    const main = document.getElementsByTagName("main");

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
        gsap.from(main, {
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