var db = require("../models");
var path = require("path");

require('../public/views/stats.html')
module.exports = function (app) {
  // Load index page

  // Serve static content for the app from the "public" directory in the application directory.
 
  app.get("/", function (req, res) {
    res.render(path.join(__dirname, "../public/views/index.html"));
  });
  
  app.get("/stats", function (req, res) {
    res.render(path.join(__dirname, "../public/views/stats.html"));
  });
  

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
