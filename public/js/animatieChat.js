  // Code voor inputgebeurtenis
  const input = document.getElementById("query");
  const arrow = document.getElementById("arrowDownSearch");
  //catalogus buttons
  const buttons = document.querySelectorAll(".catalogusButton");

  function animateGSAP() {
      // Controleer of de animatie al is uitgevoerd
      if (animateGSAP.executed) {
          return;
      }
      const categorieBtn = document.getElementById("speechBtnCateg");
      const main = document.getElementsByTagName("main")[0];
      const arrow = document.getElementById("arrowDownSearch");

      // Hiding elements by default with CSS
      gsap.set(categorieBtn, {
          opacity: 0
      });

      gsap.set(arrow, {
          opacity: 0
      });

      gsap.to(arrow, {
          duration: 0.5, // animatieduur voor verschijnen
          delay: 2, // vertraging van 3 seconden voor verschijnen
          opacity: 1, // doelwaarde voor dekking (verschijnen)
      });

      // Animatie voor het "categorieBtn" element
      gsap.to(categorieBtn, {
          duration: 0.5,
          delay: 2,
          opacity: 1
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

  /**
   * wanneer de gebruiker de input gebruikt, verdwijn animatie
   */
  input.addEventListener("click", function () {
      gsap.killTweensOf(arrow);
      gsap.set(arrow, {
          opacity: 0,
          display: "none"
      });
  });



 /**
   * wanneer de gebruiker de catalogus buttons gebruikt, verdwijn animatie
   */
buttons.forEach(function(button) {
  button.addEventListener("click", function() {
    gsap.killTweensOf(arrow);
    gsap.set(arrow, { opacity: 0, display: "none" });
  });
});