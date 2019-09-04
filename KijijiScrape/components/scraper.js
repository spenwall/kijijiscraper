const cheerio = require("cheerio");
const request = require("request-promise");
const lastId = require("./lastId");
const saveLastId = require("./saveLastId");
const mailgun = require("./mailgun");
const { URL } = require('url');

module.exports = async req => {
  let url = req.query.url;
  let email = req.query.email;
  let sendEmail = true;
  if (req.query.email === "false") {
    sendEmail = false;
  }

  const address = new URL(url);
  const path = address.pathname;
  const pathParts = path.split('/');
  const category = pathParts[1];
  const location = pathParts[2];
  const code = pathParts[3];
  
  const kijijUrl =
    "https://www.kijiji.ca/" +
    category +
    "/" +
    location +
    "/" +
    code;
  let options = {
    uri: kijijUrl,
    transform: function(body) {
      return cheerio.load(body);
    }
  };

  const adId = await lastId(category, location);

  const $ = await request(options);
  let regularAds = $(".regular-ad");
  let allAds = [];
  regularAds.each((i, ad) => {
    // if ($(ad).attr("data-listing-id") === adId) {
    //   console.log("found ad id");
    //   return false;
    // }
    allAds[i] = {
      title: $(ad)
        .find("a.title")
        .text().replace(/[\s\n\r]+/g, " ").trim(),
      link: "https://kijiji.ca" + $(ad)
        .find("a.title")
        .attr("href"),
      id: $(ad).attr("data-listing-id"),
      price: $(ad).find(".price").text(),
      image: $(ad).find("img").attr("src")
    };
  });

  var newAds = [];
  if (allAds.length) {
    const allId = allAds.map(ad => ad.id);
    const ids = allId.join(',');
    saveLastId(category, location, ids);
    var newAds = getNewAds(allAds, adId);
    newAds.forEach(ad => {
      if (sendEmail) {
        mailgun(category, ad, email)
      }
    })
    
  }
  return newAds;
};

getNewAds = (allAds, adId) => {
  if (adId === null) {
    return [];
  }
  var newAds = [];
  for (ad of allAds) {
    if (adId.includes(ad.id)) {
      break;
    }
    newAds.push(ad);
  }

  return newAds;
}