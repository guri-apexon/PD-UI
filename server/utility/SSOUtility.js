function authenticateUser(user, password) {
  const token = `${user}:${password}`;
  const hash = Buffer.from(token).toString('base64');

  return `Basic ${hash}`;
}

module.exports = {
  authenticateUser,
};
