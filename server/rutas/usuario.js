const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../modelos/usuario');

const {
  verificaToken,
  verificaAdminRole,
} = require('../middlewares/autenticacion');

const app = express();

app.get('/usuarios', function (req, res) {
  let desde = req.query.desde || 0;
  desde = Number(desde);
  let limite = req.query.limite || 5;
  limite = Number(limite);
  // res.json('GET usuario');
  Usuario.find({ estado: true })
    .skip(desde)
    .limit(limite)
    .exec((err, usuarios) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      Usuario.countDocuments({ estado: true }, (err, conteo) => {
        res.json({
          ok: true,
          usuarios,
          cantidad: conteo,
        });
      });
    });
});
app.get(
  '/usuarios/:id',
  [verificaToken, verificaAdminRole],
  function (req, res) {
    let id = req.params.id;
    // res.json("GET usuarios");
    Usuario.findById(id).exec((err, usuario) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        usuario,
      });
    });
  }
);

app.post('/usuarios', function (req, res) {
  //   req.json('POST usuario');
  let body = req.body;
  let usuario = new Usuario({
    nombre: body.nombre,
    apellido: body.apellido,
    fechaIngreso: body.fechaIngreso,
    contacto: body.contacto,
    nombreInstit: body.nombreInstit,
    contactoInstit: body.contactoInstit,
    direccion: body.direccion,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
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
});

app.put('/usuarios/:id', function (req, res) {
  // res.json('PUT usuario');
  let body = _.pick(req.body, [
    'nombre',
    'apellido',
    'fechaIngreso',
    'contacto',
    'contactoInstit',
    'direccion',
    'img',
    'estado',
  ]);
  let id = req.params.id;

  Usuario.findByIdAndUpdate(id, body, { new: true }, (err, usuarioDB) => {
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
});

//Ruta Delete
app.delete('/usuarios/:id', function (req, res) {
  let id = req.params.id;
  let estadoActualizado = {
    estado: false,
  };
  usuario.findByIdAndUpdate(
    id,
    estadoActualizado,
    { new: true },
    (err, usuarioBorrado) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      if (!usuarioBorrado) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'Usuario no encontrado.',
          },
        });
      }
      res.json({
        ok: true,
        usuario: usuarioBorrado,
      });
    }
  );
});

module.exports = app;
