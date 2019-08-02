const Airtable = require("airtable");

module.exports = async (category, location) => {
  apiKey = process.env["AIRTABLE_API_KEY"];

  var base = new Airtable({ apiKey }).base("apphLaGAQCdurVkEG");

  const select = 'AND(category = "' + category + '", location = "' + location + '")';
  
  let row = await base("lastAd")
    .select({
      view: "Grid view",
      filterByFormula: select
    })
    .firstPage();
  
  return row[0].fields.lastId;
};