# OBA Laagdrempelig zoeken


Tijdens de Meesterproef passen we toe wat we hebben geleerd in de Minor Web Development. Voor de Meesterproef krijgen we een opdracht van een echte opdrachtgever. We leren hoe we onze opgedane kennis en vaardigheden kunnen gebruiken om een ​​oplossing voor een probleem te ontwerpen.

# Opdracht
Het doel van dit project is om de digitale inclusie in Amsterdam te vergroten door het creëren van een digitale webomgeving. Met behulp van het conversational model willen we ervoor zorgen dat mensen met een digitale achterstand en taalbarrières toegang hebben tot relevante informatie en diensten, zodat ze niet afhankelijk zijn van anderen om deze informatie te verkrijgen. Het streven is om hen zelfstandig en op een natuurlijke manier gebruik te laten maken van de digitale mogelijkheden en bronnen van de OBA, waardoor ze actief kunnen participeren in de digitale samenleving.

## User stories

- Als gebruiker van de zoekinterface van de OBA, wil ik met natuurlijke taal mijn vraag stellen, zodat ik op laagdrempelige wijze relevante resultaten terugkrijg
- Als gebruiker van de zoekinterface van de OBA, wil ik een omgeving waarin ik op 1 plek de digitale conversatie aangaat met de OBA, zodat ik zowel zoeken, vragen als chat in 1 omgeving kan doen (conversational model)
- Als gebruiker van de zoekinterface van de OBA, wil ik een webinterface die goed aansluit bij een conversatie beleving zowel voor het vragen als de antwoorden en resultaten

# Documentatie

Documentatie kan je vinden in de [wiki](https://github.com/Hoa0/Laagdrempelig-zoeken/wiki/) van deze repository. 


# Features

- Resultaten weergeven vanuit catalogus
- Gebruikersinterface feedback
- Zoeken door de OBA API
- Interactie met zoekresultaten
- Zoekresultaten delen


# Demo

[Link naar demo](https://laagdrempelig-zoeken.adaptable.app/)

# Tools

- [body-parser](https://www.npmjs.com/package/body-parser)
- [cors](https://www.npmjs.com/package/cors)
- [ejs](https://www.npmjs.com/package/ejs)
- [express](https://www.npmjs.com/package/express)
- [gsap](https://www.npmjs.com/package/gsap)
- [node-fetch](https://www.npmjs.com/package/node-fetch)
- [nodemon](https://www.npmjs.com/package/nodemon)

# Installatie

Clone het project

```bash
  git clone https://github.com/Hoa0/Laagdrempelig-zoeken.git
```

Installeer dependencies

```bash
  npm install
```

Start de server

```bash
  npm run start
```

Start als dev

```bash
  npm run dev
```

# API Reference
De OBA API geeft toegang tot de database van de Openbare Bibliotheek Amsterdam, zodat je gegevens kunt ophalen met betrekking tot boeken, auteurs en meer.

## Authenticatie
De OBA API vereist een API-sleutel voor authenticatie. Voor het verkrijgen van een API-sleutel, ga naar de [OBA API-documentatie](https://zoeken.oba.nl/api/v1/).


#### Get search results

```http
  GET /search/?q={query}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `apiURL` | `string` | https://zoeken.oba.nl/api/v1/search/? |
| `q` | `string` | **Vereist**. De zoek query |


# Authors

- [@Hoa0](https://github.com/Hoa0)
- [@AllyssaA](https://github.com/AllyssaA)


# License

[MIT](https://github.com/Hoa0/Laagdrempelig-zoeken/blob/main/LICENSE)


















