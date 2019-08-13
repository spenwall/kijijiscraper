const mailgun = require('mailgun-js');

module.exports = (category, ad, email) => {
  const apiKey = process.env['MAILGUN_API_KEY'];
  const domain = process.env['MAILGUN_DOMAIN'];

  const mail = mailgun({apiKey, domain})
  const data = {
    from: 'Kijiji Alerts <alert@rfd.spencerwallace.ca>',
    to: email,
    subject: 'New Kijiji ad',
    template: 'kijiji-ad',
    "v:category": category,
    "v:title": ad.title,
    "v:link": ad.link,
    "v:price": ad.price,
    "v:image": ad.image
  };

  mail.messages().send(data, function(err, body) {
    console.log(body)
  })

}