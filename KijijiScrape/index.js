const scraper = require("./components/scraper");

module.exports = async function(context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  if (parametersAvailable(req)) {
    let ads = await scraper(req);
    body = ads.map(ad => {
      return {
        title: ad.title,
        id: ad.id,
        link: ad.link,
        price: ad.price,
        image: ad.image,
      };
    });
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: JSON.stringify(body)
    };
  } else {
    context.res = {
      status: 400,
      body: "Please pass all of the following query parameters. category, location, code, email"
    };
  }
};

function parametersAvailable(req) {
  if (!req.query.category
    || !req.query.location
    || !req.query.code) {
    return false;
  }

  return true;
}