const express = require('express');

const studentRouter = require('./students');

const server = express();

server.use(express.json());
server.use('/api/students', studentRouter);

module.exports = server;
