const loading = document.querySelector(".loading");

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
  const h1Text = document.querySelector("h1");

  // when something is wrong with data/api
  if (typeState === "noData") {
    h1Text.textContent = "Sorry, er ging iets mis. Kan resultaten niet ophalen.";
    hideLoading();
  }
  // loading state
  else if (typeState === "loading") {
    showLoading();
  }
  // show/hide results
  else if (typeState === "hide") {
    if (param) {
      h1Text.style.display = "block";
      h1Text.textContent = `Gevonden resultaten voor ${param}`;
    } else {
      h1Text.style.display = "none";
    }
    hideLoading();
  }
}
