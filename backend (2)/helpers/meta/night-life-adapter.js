function nightLifeAdapter(features) {
  nightLifeAdapter.normalizer ??= function (str) {
    if (!str) return [];
    if (/[;,]/.test(str)) {
      return str.split(/[;,]/);
    }
    return [str];
  };
  return features.map((feature) => {
    const p = feature.properties || {};
    const g = feature.geometry || {};
    const phone = nightLifeAdapter.normalizer(p.contact?.phone || null);
    return {
      id: p.place_id,
      name: p.name || p.address_line1 || null,
      address: p.formatted || null,
      lat: p.lat || (g.coordinates ? g.coordinates[1] : null),
      lon: p.lon || (g.coordinates ? g.coordinates[0] : null),
      phone,
      email: p.contact?.email || null,
      website: p.website || p.contact?.website || null,
      type: p.datasource?.raw?.amenity || "other",
      openingHours: p.opening_hours || null,
    };
  });
}

module.exports = nightLifeAdapter;
