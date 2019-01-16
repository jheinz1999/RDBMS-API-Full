const express = require('express');

const studentRouter = require('./students');
const cohortRouter = require('./cohorts');

const server = express();

server.use(express.json());
server.use('/api/students', studentRouter);
server.use('/api/cohorts', cohortRouter);

module.exports = server;
