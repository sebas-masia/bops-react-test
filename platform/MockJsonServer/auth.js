/* eslint-disable @typescript-eslint/no-var-requires */
const jwt = require('jsonwebtoken');

const { TOKEN_SECRET } = process.env;

const generateAccessToken = (username) => {
  return jwt.sign({ username }, '0b2c9d32-e9fb-4a74-8c49-ca75817a1964', { expiresIn: 24 * 60 * 60 }); // 24 hour
};

const authMw = (req, res, next) => {
  try {
    const jwtToken = req.headers.authorization.split(' ')[1];
    jwt.verify(jwtToken, TOKEN_SECRET);
    next();
  } catch (err) {
    res.sendStatus(401);
  }
};

module.exports = { generateAccessToken, authMw };
