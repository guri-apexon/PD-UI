function authenticateUser(user, password) {
  var token = user + ":" + password;
  var hash = Buffer.from(token).toString("base64");

  return "Basic " + hash;
}

module.exports = {
  authenticateUser,
};
