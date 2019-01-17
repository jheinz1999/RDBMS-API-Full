const express = require('express');
const knex = require('knex');

const genericErr = require('./common/error');
const knexConfig = require('./knexfile');

const server = express.Router();
const db = knex(knexConfig.development);
const table = 'cohorts';

server.get('/', async (req, res) => {

  try {

    const data = await db.select().from(table);

    res.status(200).json(data);

  }

  catch (err) {

    genericErr(err, res);

  }

});

server.get('/:id/students', async (req, res) => {

  const id = req.params.id;

  try {

    const data = await db.select('students.*').from('cohorts').innerJoin('students', 'cohorts.id', '=', 'students.cohort_id').where('cohorts.id', id);

    if (!data.length) {

      res.status(404).json({message: 'Cohort not found!'});
      return;

    }

    res.status(200).json(data);

  }

  catch (err) {

    console.log(err);
    genericErr(err, res);

  }

});

server.get('/:id', async (req, res) => {

  const id = req.params.id;

  try {

    const data = await db.select().from(table).where({id});

    if (!data.length) {

      res.status(404).json({message: 'Cohort not found!'});
      console.log(data);
      return;

    }

    res.status(200).json(data);

  }

  catch (err) {

    genericErr(err, res);

  }

});

server.post('/', async (req, res) => {

  const { name } = req.body;

  if (!name) {

    res.status(400).json({message: 'Invalid fields in request body'});
    return;

  }

  try {

    const id = await db.insert({ name }).into(table);
    res.status(201).json(id[0]);

  }

  catch (err) {

    genericErr(err, res);

  }

});

server.put('/:id', async (req, res) => {

  const id = req.params.id;
  let data;

  try {

    data = await db.select().from(table).where({ id });

    if (!data.length) {

      res.status(404).json({message: 'Cohort not found!'});
      return;

    }

    let { name } = req.body;

    if (!name) {

      res.status(400).json({message: 'Invalid fields in request body'});
      return;

    }

    const newData = await db.update({ name }).from(table).where({ id });

    res.status(200).json({message: 'success'});

  }

  catch (err) {

    genericErr(err, res);

  }

});

server.delete('/:id', async (req, res) => {

  const id = req.params.id;

  try {

    const data = await db.select().from(table).where({ id });

    if (!data.length) {

      res.status(404).json({message: 'Cohort not found!'});
      return;

    }

    const newData = await db.delete().from(table).where({ id });

    res.status(200).json(newData);

  }

  catch (err) {

    genericErr(err, res);

  }

});

module.exports = server;
