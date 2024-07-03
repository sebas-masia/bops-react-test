/* eslint-disable @typescript-eslint/no-var-requires */
const { generateAccessToken } = require('./auth');

module.exports = (req, res, next) => {
  if (req.method !== 'POST' || req.url !== '/login') {
    next();
    return;
  }

  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin') {
    const token = generateAccessToken(username);
    res.json({ username, token });
  } else {
    res.sendStatus(401);
  }
};
