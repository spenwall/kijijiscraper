const Airtable = require("airtable");

module.exports = async (category, location, id) => {
  apiKey = process.env["AIRTABLE_API_KEY"];

  let base = new Airtable({ apiKey }).base("apphLaGAQCdurVkEG");

  const select = 'AND(category = "' + category + '", location = "' + location + '")';
  
  let row = await base("lastAd")
    .select({
      view: "Grid view",
      filterByFormula: select
    })
    .firstPage(); 

  base("lastAd").update(row[0].id, {
    "category": category,
    "location": location,
    "lastId": id
  })
}