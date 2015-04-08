var Mailgun = require('mailgun-js')
var config = require("./config")

var apiKey = config.mailgunApiKey
    , domain = "elcreativegroup.com"

module.exports = new Mailgun({apiKey: apiKey, domain: domain})
