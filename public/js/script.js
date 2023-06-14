/* eslint-disable no-undef */
const button = document.getElementById("btnBook");
const texts = document.getElementsByClassName("showResult");
const content = document.querySelector("#content");
const obaHelper = document.getElementById("svg-help");
const contentChat = document.getElementById("chat");
const result = document.getElementById("searchResult");


button.addEventListener("click", function () {
    for (let i = 0; i < texts.length; i++) {
        texts[i].style.display = "block";
    }
    gsap.from(result, { duration: 1, y: 30, opacity: 0 });
});

function animation() {
    gsap.from(content, { opacity: 0, duration: 1, y: -50 });
    gsap.from(obaHelper, { duration: 1, y: 30, opacity: 0 });
    gsap.from(contentChat, { duration: 1, y: 30, opacity: 0 });
}

animation();