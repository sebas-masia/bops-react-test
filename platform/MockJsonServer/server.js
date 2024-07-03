/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
const jsonServer = require('json-server');
const cors = require('cors');
const data = require('./data/data');
const { authMw } = require('./auth');
const login = require('./login');

const server = jsonServer.create();
const router = jsonServer.router(data());
const middlewares = jsonServer.defaults();

server.use(
  cors({
    origin: true,
    credentials: true,
    preflightContinue: false,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  }),
);

server.use(jsonServer.bodyParser);
server.use(login);

// block anything but get
server.use((req, res, next) => {
  if (req.method !== 'GET') {
    res.sendStatus(404);
  } else {
    next();
  }
});

server.use(router);
server.listen(3001, () => {
  console.log('JSON Server is running');
});
