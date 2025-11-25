const axios = require("axios");
const qs = require("querystring");
const env = require("../utilities/env.js");

async function fetchImageUrls(wikiData) {
  if (!wikiData) return null;

  const images = await Promise.all(
    wikiData.map(async (wikidataId) => {
      const query = `
        SELECT ?image WHERE {
          wd:${wikidataId} wdt:P18 ?image.
        }
      `;

      const url = `${env.WIKI_DATA_HOST}?${qs.stringify({
        query,
        format: "json",
      })}`;
      const { data } = await axios.get(url, {
        headers: { "User-Agent": "BardinerTravel/1.0" },
      });
      return data.results.bindings.map((b) => b.image.value);
    })
  );
  return images;
}

module.exports = fetchImageUrls;
