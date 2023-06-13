const searchForm = document.getElementById('searchForm');
const searchResults = document.getElementById('searchResults'); // Add this line

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const input = document.getElementById('query');

    try {
        const response = await fetch('/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: input.value }),
        });

        if (response.ok) {
            const responseData = await response.json();

            // console.log(responseData.data)
            // let crackdown = JSON.parse(JSON.stringify(responseData.data))
            // let firstRemoval = crackdown.substring(1)

            const dirtySet = JSON.parse(JSON.stringify(responseData.data))
            // const cleanSet = dirtySet.substring(1)

            // Show books in the browser using responseData
            // Clear previous results
            searchResults.innerHTML = '';


            if (await responseData.data) {
                // let x = await responseData
                // let remResponseData = JSON.parse(firstRemoval)

                /** @description removes the first string character. Reason for the function is that the dataset received is being tossed around between stringify and parse, adding an empty character within the body of the results key */
                function RemoveSpaceFromString(dataThatHasBeenStringified) {
                    return dataThatHasBeenStringified.substring(1)
                }
                let responseDataSet = JSON.parse(RemoveSpaceFromString(dirtySet))
                console.log(responseDataSet)

                // Display the search results
                responseDataSet.results.forEach((result) => {

                    const title = result.titles[0];
                    const author = result.authors ? result.authors[0] : "Onbekende auteur";
                    const img = result.coverimages[0];
            
                    const resultItem = document.createElement('div');
                    resultItem.innerHTML = `<p>Titel: ${title}</p><p>Auteur: ${author}</p> <img src='${img}'>`;
            
                    searchResults.appendChild(resultItem);
                });
            } else {
                console.log('No results found.');
            }
            
        } else {
            const errorMessage = await response.text();
            console.error(errorMessage);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
});
