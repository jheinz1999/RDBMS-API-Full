const express = require('express');
const knex = require('knex');

const genericErr = require('./common/error');
const knexConfig = require('./knexfile');

const server = express.Router();
const db = knex(knexConfig.development)('students');

server.get('/', async (req, res) => {

  try {

    const data = await db.select();

    res.status(200).json(data);

  }

  catch (err) {

    genericErr(err, res);

  }

});

module.exports = server;
