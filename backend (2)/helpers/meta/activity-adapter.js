function activityAdapter(features) {
  activityAdapter.normalizer ??= function (str) {
    if (!str) return [];
    if (/[;,]/.test(str)) {
      return str.split(/[;,]/);
    }
    return [str];
  };
  return features.map((feature) => {
    const p = feature?.properties ?? {};
    const raw = p.datasource?.raw ?? {};
    const cuisine = p.catering?.cuisine ?? raw.cuisine ?? null;
    const phone = p.contact?.phone ?? raw.phone ?? null;
    const normalizedPhone = activityAdapter.normalizer(phone);
    const normalizedCuisine = activityAdapter.normalizer(cuisine);
    return {
      id: p.place_id,
      name: p.address_line1 ?? p.name ?? raw.name ?? null,
      lat: p.lat ?? feature?.geometry?.coordinates?.[1] ?? null,
      lon: p.lon ?? feature?.geometry?.coordinates?.[0] ?? null,
      type: raw.amenity || null,
      address: p.formatted ?? p.address_line2 ?? null,

      // Contact
      phone: normalizedPhone,
      email: p.contact?.email ?? raw.email ?? null,
      website: p.website ?? raw.website ?? null,

      // Business details
      openingHours: p.opening_hours ?? raw.opening_hours ?? null,
      cuisine: normalizedCuisine,

      // Facilities

      smoking:
        typeof p.facilities?.smoking === "boolean"
          ? p.facilities.smoking
          : raw.smoking
          ? true
          : false,
      wikidata: p.wiki_and_media?.wikidata ?? raw.wikidata ?? null,
    };
  });
}

module.exports = activityAdapter;
