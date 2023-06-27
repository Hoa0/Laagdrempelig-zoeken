const loading = document.querySelector(".loading");
const resultsContainer = document.querySelector(".results-container");

// Show loading animation
export function showLoading() {
  loading.style.display = "block";
}

// Hide loading animation
export function hideLoading() {
  loading.style.display = "none";
}

// Handle UI states
export function uiState(typeState, param = "") {
  const ul = document.createElement("ul");
  const li = document.createElement("li");

  if (typeState === "noData") {
    ul.textContent = "Oeps, er is iets fout gegaan. Ik kan de resultaten niet ophalen.";
    resultsContainer.appendChild(ul);
    hideLoading();
  } else if (typeState === "loading") {
    showLoading();
  } else if (typeState === "hide") {
    if (param) {
      ul.style.display = "block";
      li.classList.add("speechOba");
      li.textContent = `Ik heb resultaten gevonden voor ${param}`;
      ul.appendChild(li);
      resultsContainer.appendChild(ul);
    } else {
      ul.style.display = "none";
    }
    hideLoading();
  } else if (typeState === "noLink") {
    ul.style.display = "block";
    li.classList.add("speechOba");
    li.textContent = `Sorry, het is niet mogelijk om de link te kopiëren.`;
    ul.appendChild(li);
    resultsContainer.appendChild(ul);
  } else if (typeState === "copied") {
    ul.style.display = "block";
    li.classList.add("speechOba");
    li.textContent = `De link is gekopieerd!`;
    ul.appendChild(li);
    resultsContainer.appendChild(ul);
  }
}
