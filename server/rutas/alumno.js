const express = require('express');
const Alumno = require('../modelos/alumno');

const {
  verificaToken,
  verificaAdminRole,
} = require('../middlewares/autenticacion');

const _ = require('underscore');
const app = express();

app.get('/alumnos', [verificaToken, verificaAdminRole], function (req, res) {
  //   res.json('GET alumnos');

  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 10;
  limite = Number(limite);

  Alumno.find({ estado: true })
    .limit(limite)
    .skip(desde)
    .sort('expediente')
    .exec((err, alumno) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      Alumno.countDocuments({ estado: true }, (err, conteo) => {
        res.json({
          ok: true,
          alumno,
          cantidad: conteo,
        });
      });
    });
});

app.get('/alumnos/:id', verificaToken, function (req, res) {
  let id = req.params.id;

  Alumno.findById(id).exec((err, alumno) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      alumno,
    });
  });
});
app.post('/alumnos', [verificaToken, verificaAdminRole], function (req, res) {
  let body = req.body;

  let alumno = new Alumno({
    nombreCompleto: body.nombreCompleto,
    año: body.año,
    expediente: body.expediente,
    cuota: body.cuota,
  });
  alumno.save((err, alumnoDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      alumnoDB,
    });
  });
});

app.put(
  '/alumnos/:id',
  [verificaToken, verificaAdminRole],
  function (req, res) {
    let id = req.params.id;
    let body = req.body;

    Alumno.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true },
      (err, alumnoDB) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err,
          });
        }
        res.json({
          ok: true,
          alumno: alumnoDB,
        });
      }
    );
  }
);

app.delete(
  '/alumnos/:id',
  [verificaToken, verificaAdminRole],
  function (req, res) {
    let id = req.params.id;
    let estadoActualizado = {
      estado: false,
    };

    Alumno.findByIdAndUpdate(
      id,
      estadoActualizado,
      { new: true },
      (err, alumnoBorrado) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err,
          });
        }

        if (!alumnoBorrado) {
          return res.status(400).json({
            ok: false,
            err: {
              message: 'Alumno no encontrado',
            },
          });
        }
        res.json({
          ok: true,
          alumnoBorrado,
        });
      }
    );
  }
);

module.exports = app;
