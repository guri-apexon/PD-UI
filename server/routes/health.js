module.exports = function (app) {
  app.get("/health", function (req, res) {
    res.send("F5-UP");
  });
};
