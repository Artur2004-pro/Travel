function hotelAdapter(features) {
  hotelAdapter.normalizer ??= function (str) {
    if (!str) return [];
    if (/[;,]/.test(str)) {
      return str.split(/[;,]/);
    }
    return [str];
  };
  return features.map((feature) => {
    const raw = feature.properties.datasource?.raw || {};
    const accommodation = feature.properties.accommodation || {};
    const phone = raw.phone || null;
    const normalizedPhone = phone ? hotelAdapter.normalizer(phone) : null;

    return {
      id: feature.properties.place_id,
      name: feature.properties.name,
      lon: feature.properties.lon,
      lat: feature.properties.lat,
      address: feature.properties.formatted || null,

      email: raw.email || null,
      phone: raw.phone || null,
      rooms: raw.rooms || accommodation.rooms || null,
      stars: raw.stars || accommodation.stars || null,
      phone: normalizedPhone,
      website: raw.website || feature.properties.website || null,
      wikidata:
        raw.wikidata || feature.properties.wiki_and_media?.wikidata || null,
      image: raw.image || null,
    };
  });
}

module.exports = hotelAdapter;
