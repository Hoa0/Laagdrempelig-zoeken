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

  switch (typeState) {
    case "noData":
      ul.style.display = "block";
      li.classList.add("speechOba");
      li.textContent =
        "Oeps! Er is iets misgegaan. Ik kan de resultaten niet ophalen. Probeer iets anders.";
      ul.appendChild(li);
      resultsContainer.appendChild(ul);
      hideLoading();
      break;

    case "loading":
      showLoading();
      break;

    case "hide":
      ul.style.display = param ? "block" : "none";
      li.classList.add("speechOba");
      li.textContent = param
        ? `
      Ik heb resultaten gevonden voor ${param}.`
        : "";
      ul.appendChild(li);
      resultsContainer.appendChild(ul);
      hideLoading();
      break;

    case "noLink":
      ul.style.display = "block";
      li.classList.add("speechOba");
      li.textContent = `Sorry, het is niet mogelijk om de link te kopiëren.`;
      ul.appendChild(li);
      resultsContainer.appendChild(ul);
      break;

    case "copied":
      ul.style.display = "block";
      li.classList.add("speechOba");
      li.textContent = `De link is gekopieerd! Je kan het nu delen.`;
      ul.appendChild(li);
      resultsContainer.appendChild(ul);
      break;
  }
}
