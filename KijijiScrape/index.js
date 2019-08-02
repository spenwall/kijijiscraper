const scraper = require("./components/scraper");

module.exports = async function(context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  if (req.query.category) {
    let ads = await scraper(req);
    body = ads.map(ad => {
      return {
        title: ad.title.replace(/[\s\n\r]+/g, " ").trim(),
        id: ad.id,
        link: ad.link,
      };
    });
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: JSON.stringify(body)
    };
  } else {
    context.res = {
      status: 400,
      body: "Please pass a name on the query string or in the request body"
    };
  }
};