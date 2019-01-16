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

server.get('/:id', async (req, res) => {

  const id = req.params.id;

  try {

    const data = await db.select().where({id});

    if (!data.length) {

      res.status(404).json({message: 'User not found!'});
      return;

    }

    res.status(200).json(data);

  }

  catch (err) {

    genericErr(err, res);

  }

});

server.post('/', async (req, res) => {

  const { name, cohort_id } = req.body;

  if (!name || !cohort_id) {

    res.status(400).json({message: 'Invalid fields in request body'});
    return;

  }

  try {

    const id = await db.insert({ name, cohort_id });
    res.status(201).json(id[0]);

  }

  catch (err) {

    genericErr(err, res);

  }

});

module.exports = server;
