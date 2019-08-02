const mailgun = require('mailgun-js');

module.exports = (category, title, link) => {
  const apiKey = process.env['MAILGUN_API_KEY'];
  const domain = process.env['MAILGUN_DOMAIN'];

  const mail = mailgun({apiKey, domain})
  const data = {
    from: 'Kijiji Alerts <alert@rfd.spencerwallace.ca>',
    to: 'dude.wallace@gmail.com',
    subject: 'New Kijiji ad',
    template: 'kijiji-ad',
    "v:category": category,
    "v:title": title,
    "v:link": link
  };

  mail.messages().send(data, function(err, body) {
    console.log(body)
  })

}