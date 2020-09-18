require('module-alias/register');
require('dotenv/config');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const { map } = require('./tools');

/*
  ? Activate params in .env
*/

module.exports = function (app, server) {
  const params = [
    {
      value: process.env.GRAPHQL,
      activate: () => require('@/services/graphql/router')(app),
    },
    {
      value: process.env.WEBSOCKET,
      activate: () => require('@/services/websocket')(server),
    },
    {
      value: process.env.CORS,
      activate: () => app.use(cors()),
    },
    {
      value: process.env.LOGGER,
      activate: () => app.use(morgan('dev')),
    },
    {
      value: process.env.AUTH,
      activate: () => require('@/middlewares/auth')(app),
    },
    {
      value: process.env.JSON,
      activate: () => app.use(express.json()),
    },
  ];

  const isActive = (param) => param.value === 'true';
  const activateInApp = (param) => (isActive(param) ? param.activate() : null);

  return map(activateInApp)(params);
};
