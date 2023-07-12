import fetch from "node-fetch";

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
export const fetchData = async (req, res) => {
  const publicKey = "0076bc3bc11d080e07a303360178002a";
  const query = req.body.query;

  const apiUrl = "https://zoeken.oba.nl/api/v1/search/?q=" + query;
  const publicKeyParam = `&authorization=${publicKey}`;
  const outputParam = "&output=json";

  const apiUrlWithParams = apiUrl + publicKeyParam + outputParam;
  const corsApiUrl = apiUrlWithParams;
  console.log(corsApiUrl);

  try {
    // Make the API request using fetch
    const response = await fetch(corsApiUrl, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });

    if (!response.ok) {
      // Throw an error if the response is not successful
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Parse the response body as text
    const responseBody = await response.text();

    // Render the response in the index.ejs template
    res.json({ data: responseBody });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
};
