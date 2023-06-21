import fetch from "node-fetch";
import crypto from "crypto"
import { Url } from "url";
import "dotenv/config";

const config = { obaSecKey: process.env.OBA_SECRET, obaPulicKey: process.env.OBA_PUBLIC }

// const apiCatalogus = "https://zoeken.oba.nl/sru/api/v1/help/";



// let acceptHeader = "application/xml" // for example, this should be the actual Accept header sent with the request
// //let date = DateTime.UtcNow.ToString("r") // current UTC datetime formatted according to RFC1123.
// let date = Math.floor(Date.now() / 1000) + (30 * 60);
// let hostHeader = "localhost" // should match Host header value
// let path = url.AbsolutePath // the path part of the URL (ensure to include the / suffix)

// // The sorted query, where key/value pairs are alphabetically sorted. Specifically this sorting should use ordinal string comparison.
// // the individual value sof the querystring should be URL encoded, where the %-values need to be uppercased (%2f -> %2F)
// let query = sortedQuery

// let id = acceptHeader + nl + date + nl + hostHeader + nl + path + nl + sortedQuery + nl;
// let hmac = new HMACSHA1(Encoding.UTF8.GetBytes(secretKey));
// let hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(id));

// // The final result, base64 encoded as per http://msdn.microsoft.com/en-us/library/dhx0d524(v=vs.110).aspx .
// System.Convert.ToBase64String(hash)

// const fetch = require('node-fetch');
// const crypto = require('crypto');

// const apiCatalogus = "https://zoeken.oba.nl/sru/api/v1/help/";

// const publicKey = "0076bc3bc11d080e07a303360178002a";
// const secretKey = "187b973dc49e054fa7635313a9c8540f";
// const nl = "\n";

// const acceptHeader = "application/xml";
// const date = Math.floor(Date.now() / 1000) + (30 * 60);
// const hostHeader = "localhost";
// const path = Url.AbsolutePath; // Vergeet niet de juiste URL in te stellen 

// // Sorteer de queryparameters
// const sortedQuery = { /* plaats hier je gesorteerde queryparameters */ };
// const sortedQueryString = Object.keys(sortedQuery)
//     .sort()
//     .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(sortedQuery[key]).toUpperCase()}`)
//     .join('&');

// const id = acceptHeader + nl + date + nl + hostHeader + nl + path + nl + sortedQueryString + nl;
// const hmac = crypto.createHmac('sha1', secretKey);
// hmac.update(id);
// const hash = hmac.digest('base64');

// const base64Hash = Buffer.from(hash, 'binary').toString('base64');

// function getCatalogus() {
//     console.log(path, 'entering the getCatalogus function')
//     // Voer de fetch-operatie uit en toon de resultaten in de console
//     fetch(apiCatalogus, {
//         headers: {
//             Accept: acceptHeader,
//             Date: date,
//             Host: hostHeader,
//             Authorization: base64Hash
//         }
//     })
//         .then(response => response.text())
//         .then(data => console.log(data))
//         .catch(error => console.error(error));

// }

// // export getCatalogus();
// export { getCatalogus }

// een fetch schrijven met de JWT token, deze heeft een authorization: Bearer header nodig
// dat is deze eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJrZXkiOiIwMDc2YmMzYmMxMWQwODBlMDdhMzAzMzYwMTc4MDAyYSIsImV4cCI6IjE2ODcxNzgzNjMifQ.KvghdQuJDrRljOTkMim-NTBoudI6o4eocoeFuHExdrw
