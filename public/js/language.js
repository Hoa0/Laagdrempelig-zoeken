// language options script 
function initializeStyledSelects() {
    // Iterate over each select element
    let selectElements = document.querySelectorAll("select");
    selectElements.forEach((selectElement) => {
        // Cache the number of options
        let numberOfOptions = selectElement.children.length;

        // Hides the select element
        selectElement.classList.add("s-hidden");

        // Wrap the select element in a div
        let selectWrapper = document.createElement("div");
        selectWrapper.className = "select";
        selectElement.parentNode.insertBefore(selectWrapper, selectElement);
        selectWrapper.appendChild(selectElement);

        // Insert a styled div to sit over the top of the hidden select element
        let styledSelect = document.createElement("div");
        styledSelect.className = "styledSelect";
        selectElement.parentNode.insertBefore(styledSelect, selectElement.nextSibling);

        // Cache the styled div
        let styledSelectSibling = selectElement.nextElementSibling;

        // Show the first select option in the styled div
        styledSelectSibling.textContent = selectElement.children[0].textContent;

        // Insert an unordered list after the styled div and also cache the list
        let list = document.createElement("ul");
        list.className = "options";
        styledSelectSibling.parentNode.insertBefore(list, styledSelectSibling.nextSibling);

        // Insert a list item into the unordered list for each select option
        for (let i = 0; i < numberOfOptions; i++) {
            let listItem = document.createElement("li");
            listItem.textContent = selectElement.children[i].textContent;
            listItem.setAttribute("rel", selectElement.children[i].value);
            list.appendChild(listItem);
        }

        // Cache the list items
        let listItems = list.children;

        // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
        styledSelectSibling.addEventListener("click", (e) => {
            e.stopPropagation();
            let activeStyledSelects = document.querySelectorAll("div.styledSelect.active");
            activeStyledSelects.forEach((activeStyledSelect) => {
                activeStyledSelect.classList.remove("active");
                let optionsList = activeStyledSelect.nextElementSibling;
                optionsList.style.display = "none";
            });
            styledSelectSibling.classList.toggle("active");
            let optionsList = styledSelectSibling.nextElementSibling;
            optionsList.style.display = (optionsList.style.display === "none") ? "block" : "none";
        });

        // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
        // Updates the select element to have the value of the equivalent option
        for (let j = 0; j < listItems.length; j++) {
            listItems[j].addEventListener("click", (e) => {
                e.stopPropagation();
                styledSelectSibling.textContent = e.target.textContent;
                styledSelectSibling.classList.remove("active");
                selectElement.value = e.target.getAttribute("rel");
                let optionsList = styledSelectSibling.nextElementSibling;
                optionsList.style.display = "none";
                /* alert(selectElement.value); Uncomment this for demonstration! */
            });
        }

        // Hides the unordered list when clicking outside of it
        document.addEventListener("click", () => {
            styledSelectSibling.classList.remove("active");
            let optionsList = styledSelectSibling.nextElementSibling;
            optionsList.style.display = "none";
        });
    });
}
