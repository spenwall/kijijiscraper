const Airtable = require("airtable");

module.exports = async (category, location) => {
  apiKey = process.env["AIRTABLE_API_KEY"];

  var base = new Airtable({ apiKey }).base("apphLaGAQCdurVkEG");

  const select =
    'AND(category = "' + category + '", location = "' + location + '")';
  
  return base('lastAd').select({
    filterByFormula: select
  });

  // let id = await base("lastAd")
  //   .select({
  //     view: "Grid view",
  //     filterByFormula: select
  //   })
  //   .firstPage(function(err, records) {
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }
  //     records.forEach(function(record) {
  //       return record.get("lastId");
  //     });
  //   });
};
