const Airtable = require("airtable");

module.exports = async (url, id) => {
  apiKey = process.env["AIRTABLE_API_KEY"];

  let base = new Airtable({ apiKey }).base("apphLaGAQCdurVkEG");

  const select = 'AND(url = "' + url + '")';
  
  let row = await base("lastAd")
    .select({
      view: "Grid view",
      filterByFormula: select
    })
    .firstPage(); 

  base("lastAd").update(row[0].id, {
    "lastId": id
  })
}