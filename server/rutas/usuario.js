const express = require('express');
const Usuario = require('../modelos/usuario');
const app = express();

app.get('/usuarios', function (req, res) {
  res.json('GET usuario');
});

app.post('/usuarios', function (req, res) {
  //   req.json('POST usuario');
  let body = req.body;
  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: body.password,
    role: body.role,
  });
  usuario.save((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      usuario: usuarioDB,
    });
  });

  // if (body.usuario === undefined) {
  //   res.status(400).json({
  //     ok: false,
  //     message: 'El usuario es necesario',
  //   });
  // } else {
  //   res.json({
  //     body,
  //   });
  // }
});

app.put('/usuarios:id', function (req, res) {
  res.json('PUT usuario');
});

app.delete('/usuarios:id', function (req, res) {
  res.json('DELETE usuario');
});
module.exports = app;
