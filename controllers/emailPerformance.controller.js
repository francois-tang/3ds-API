//var model = require("../models/emailPerformance.model");
require("../models/emailPerformance.model");

var emailPerfController = {
    getData: async (req, res) => {
      try {
        res.render("success");
      } catch (err) {
        console.error(err);
        res.render("error");
        next(err);
      }
    }
};

module.exports = emailPerfController;