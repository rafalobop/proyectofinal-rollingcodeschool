const express = require('express');
const app = express();

app.use(require('./usuario'));
app.use(require('./alumno'));
app.use(require('/materia'))

module.exports = app;
