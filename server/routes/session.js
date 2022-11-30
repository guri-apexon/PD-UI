module.exports = function (app) {
  app.get('/session', function (req, res) {
    console.log('session', req.session.user);
    res.send(req.session.user);
  });
};
