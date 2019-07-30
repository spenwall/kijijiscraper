const cheerio = require("cheerio");
const request = require("request-promise");

module.exports = async req => {
  const url = "https://www.kijiji.ca/" + req.query.category + "/" + req.query.location + "/" + req.query.code;
  let options = {
    uri: url,
    transform: function(body) {
      return cheerio.load(body);
    }
  };

  const $ = await request(options);
  let regularAds = $(".regular-ad");
  let ads = [];
  regularAds.each((i, ad) => {
    ads[i] = {
      title: $(ad)
        .find("a.title")
        .text(),
      link: $(ad)
        .find("a.title")
        .attr("href"),
      id: $(ad).attr('data-listing-id')
    };
  });

  return ads;
};
