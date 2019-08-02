const cheerio = require("cheerio");
const request = require("request-promise");
const lastId = require("./lastId");
const saveLastId = require("./saveLastId");

module.exports = async req => {
  const url =
    "https://www.kijiji.ca/" +
    req.query.category +
    "/" +
    req.query.location +
    "/" +
    req.query.code;
  let options = {
    uri: url,
    transform: function(body) {
      return cheerio.load(body);
    }
  };

  const adId = await lastId(req.query.category, req.query.location);

  const $ = await request(options);
  let regularAds = $(".regular-ad");
  let ads = [];
  regularAds.each((i, ad) => {
    if ($(ad).attr("data-listing-id") === adId) {
      console.log("found ad id");
      return false;
    }
    ads[i] = {
      title: $(ad)
        .find("a.title")
        .text(),
      link: $(ad)
        .find("a.title")
        .attr("href"),
      id: $(ad).attr("data-listing-id")
    };
  });
  
  saveLastId(req.query.category, req.query.location, ads[ads.length-1].id);
  return ads;
};
