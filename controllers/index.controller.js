var indexController = {
    getWelcome: async (req, res) => {
      try {
        res.render("index");
      } catch (err) {
        console.error(err);
        next(err);
      }
    },
    getAbout: async (req, res) => {
        try {
          res.render("about");
        } catch (err) {
          console.error(err);
          next(err);
        }
      }
};

module.exports = indexController;