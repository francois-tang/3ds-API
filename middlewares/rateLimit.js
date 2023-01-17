var rateLimit = require("express-rate-limit");

var rateLimit = rateLimit({
      windowMs: 1 * 60 * 1000, // 1 min
      max: 5, //Limit each IP to 5 requests per `window`
      message: "You exceeded 5 requests in 1 minute limit!",
      headers: true
})

module.exports = rateLimit;