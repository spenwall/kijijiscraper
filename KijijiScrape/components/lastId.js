const Airtable = require("airtable");
const apiKey = process.env["AIRTABLE_API_KEY"];

module.exports = async (category, location) => {
  var base = new Airtable({ apiKey }).base("apphLaGAQCdurVkEG");

  const select =
    'AND(category = "' + category + '", location = "' + location + '")';

  let row = await base("lastAd")
    .select({
      view: "Grid view",
      filterByFormula: select
    })
    .firstPage();

  if (row.length === 0) {
    createNewRow(category, location);
    return;
  }
  return row[0].fields.lastId;
};

createNewRow = (category, location) => {
  let base = new Airtable({ apiKey }).base("apphLaGAQCdurVkEG");

  base("lastAd").create(
    {
      category: category,
      location: location,
    },
    function(err, record) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(record.getId());
    }
  );
};
