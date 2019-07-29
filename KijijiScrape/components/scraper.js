const cheerio = require("cheerio");
const request = require("request-promise");

module.exports = async req => {
  const url = "https://www.kijiji.ca/b-bikes/medicine-hat/c644l1700231";
  let options = {
    uri: url,
    transform: function(body) {
      return cheerio.load(body);
    }
  };

  const $ = await request(options);
  let ads = $(".regular-ad");
  let titles = [];
  ads.each((i, ad) => {
    titles[i] = ad.find('.title');
  });

  return response;
};
