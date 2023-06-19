const loading = document.querySelector(".loading");
// remove loading animation
export function loadingIsDone() {
  loading.remove();
}

// WIP states
export function uiState(typeState, param = "") {
  const h1Text = document.querySelector("h1");
  const searchForm = document.getElementById("searchForm");
  const searchResults = document.getElementById("searchResults"); 

  // when something is wrong with data/api
  if (typeState == "noData") {
    h1Text.textContent = "Sorry, er ging iets mis. Kan resulten niet ophalen.";
    loading.style.display = "none";
  }
  // loading state
  else if (typeState == "loading") {
    loading.style.display = "block";
  }
  // show results
  else if (typeState == "results") {
    loadingIsDone();
    h1Text.style.display = "block";
    h1Text.textContent = `Gevonden resultaten voor ${param}`;
  }
}
