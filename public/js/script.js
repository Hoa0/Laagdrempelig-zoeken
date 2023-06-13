const button = document.getElementById("btnBook");
const texts = document.getElementsByClassName("showResult");

button.addEventListener('click', function () {
    for (let i = 0; i < texts.length; i++) {
        texts[i].style.display = 'block';
    }
});