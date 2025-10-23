const { Country } = require("../models/");

class CountryController {
  async getAll(req, res) {
    const countries = await Country.find({});
    return res.status(200).send({ countries });
  }
  
}

module.exports = new CountryController();
