require('dotenv/config');
require('module-alias/register');
require('@/database');

const requireDir = require('require-dir');
const routers = requireDir('../router');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const { map } = require('@/utils/tools');

//? Load selected Services, Middlewares etc ...
require('@/utils/preloadConfig')(app, server);
//? Auto insert routers
map((fn) => fn(app))(Object.values(routers));

module.exports = server;
