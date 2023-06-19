const loading = document.querySelector(".loading");
// remove loading animation
export function loadingIsDone() {
  loading.remove();
}

// WIP states
export function uiState(typeState, param = "") {
  const h1Text = document.querySelector("h1");
  const searchForm = document.getElementById("searchForm");
  const searchResults = document.getElementById("searchResults"); // Add this line
  // const element = document.querySelector('.collections')
  // const collection = document.querySelector('.collection')
  const h2Text = document.createElement("h2");
  // const removeH2 = document.querySelector('.collections h2')

  // when something is wrong with data/api
  if (typeState == "noData") {
    h1Text.textContent = "Sorry, er ging iets mis. Kan resulten niet ophalen.";
  }
  // search doesn't return anything
  else if (typeState == "loading") {
    loading.style.display = "block";
    h1Text.textContent = `Gevonden resultaten voor ${param}`;
  }
  //searched
  else if (typeState === "searched") {
    if (removeH2 >= "") {
      console.log("nothing to remove");
    } else {
      removeH2.remove();
      console.log("removed executed");
    }
    h1Text.textContent = `Resultaten voor: ${param}`;
  } else if (typeState === "entree") {
    h1Text.textContent = "";
  }
}
