const Airtable = require("airtable");

module.exports = async (url, id) => {
  apiKey = process.env["AIRTABLE_API_KEY"];

  let base = new Airtable({ apiKey }).base("apphLaGAQCdurVkEG");

  let row = await base("lastAd")
    .select({
      view: "Grid view",
    })
    .firstPage(); 

  console.log(row)
  base("lastAd").update(row[0].id, {
    "url": url,
    "lastId": id
  })
}