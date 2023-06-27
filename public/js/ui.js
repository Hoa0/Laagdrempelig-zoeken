const loading = document.querySelector(".loading");
const resultsContainer = document.querySelector(".results-container");

// show loading animation
export function showLoading() {
  loading.style.display = "block";
}

// hide loading animation
export function hideLoading() {
  loading.style.display = "none";
}

// WIP states
export function uiState(typeState, param = "") {
  const ul = document.createElement("ul");
  const li = document.createElement("li");

  // when something is wrong with data/api
  if (typeState === "noData") {
    ul.textContent = "Sorry, er ging iets mis. Kan resultaten niet ophalen.";
    resultsContainer.appendChild(ul);
    hideLoading();
  }
  // loading state
  else if (typeState === "loading") {
    showLoading();
  }
  // show/hide results
  else if (typeState === "hide") {
    if (param) {
      ul.style.display = "block";
      li.classList.add("speechOba");
      li.textContent = `Gevonden resultaten voor ${param}`;
      ul.appendChild(li);
      resultsContainer.appendChild(ul);
    } else {
      ul.style.display = "none";
    }
    hideLoading();
  }
}
