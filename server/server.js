const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get('/alumnos', function (req, res) {
  res.json('GET alumnos');
});

app.post('/alumnos', function (req, res) {
  //   req.json('POST alumnos');
  let body = req.body;

  res.json({
    body,
  });
});

app.put('/alumnos:id', function (req, res) {
  res.json('PUT alumnos');
});

app.delete('/alumnos:id', function (req, res) {
  res.json('DELETE alumnos');
});

mongoose.connect(
  'mongodb://localhost:27017/codeschool',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  },
  (err, res) => {
    if (err) throw err;
    console.log('Base de datos online');
  }
);

app.listen(3000);
console.log('escuchando en puerto 3000');
