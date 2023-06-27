// controller/catalogusController.js
import fetch from "node-fetch";
const api_url_base = "https://cors-anywhere.herokuapp.com/https://zoeken.oba.nl/api/v1/search/?q=";
const api_key = "&authorization=d7519ea81ad4e06ab5e5dac46ddeb63a";
const api_output = "&output=json";
const api_pagesize = "&pagesize=5";

export async function getResults(searchTerm, facet = "") {
    const api_url = api_url_base + searchTerm + facet + api_pagesize + api_key + api_output;

    try {
        const response = await fetch(api_url, {
            headers: {
                "X-Requested-With": "XMLHttpRequest",
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log(await response.json())
            return data.results;
        } else {
            console.error("Error fetching data:", response.status, response.statusText);
            return [];
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}
