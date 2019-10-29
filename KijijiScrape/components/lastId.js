const Airtable = require("airtable");
const apiKey = process.env["AIRTABLE_API_KEY"];

module.exports = async (url) => {
  var base = new Airtable({ apiKey }).base("apphLaGAQCdurVkEG");

  let row = await base("lastAd")
    .select({
      view: "Grid view",
    })
    .firstPage();

  if (row.length === 0) {
    createNewRow(url);
    return null;
  }

  return row[0].fields.lastId.split(',');
};

createNewRow = (url) => {
  let base = new Airtable({ apiKey }).base("apphLaGAQCdurVkEG");

  base("lastAd").create(
    {
      url
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
