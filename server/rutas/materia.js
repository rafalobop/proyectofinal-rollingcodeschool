const express = require('express');
const Materia = require('../modelos/materia');

const {
  verificaToken,
  verificaAdminRole,
} = require('../middlewares/autenticacion');

const _ = require('underscore');
const app = express();

app.get('/materias', function (req, res) {
  // res.json("GET usuarios");

  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 5;
  limite = Number(limite);

  Materia.find({ estado: true })
    .limit(limite)
    .skip(desde)
    .sort("nombreMateria") 
    .exec((err, materias) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      Materia.countDocuments({ estado: true }, (err, conteo) => {
        res.json({
          ok: true,
          materias,
          cantidad: conteo,
        });
      });
    });
});

app.get('/materias/:id', function (req, res) {
  let id = req.params.id;

  Materia.findById(id).exec((err, materia) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      materia,
    });
  });
});

app.post('/materias', [verificaToken, verificaAdminRole], function (req, res) {
  let body = req.body;

  let materia = new Materia({
    nombreMateria: body.nombreMateria,
    detalle: body.detalle,
    imagen: body.imagen,
    nota: body.nota,
    anio: body.anio,
  });

  materia.save((err, materiaDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      materia: materiaDB,
    });
  });
});
app.put(
  '/materias/:id',
  [verificaToken, verificaAdminRole],
  function (req, res) {
    // res.json("PUT usuarios");
    let id = req.params.id;
    let body = req.body;

    Materia.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true },
      (err, materiaDB) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err,
          });
        }
        res.json({
          ok: true,
          materia: materiaDB,
        });
      }
    );
  }
);

app.delete(
  '/materias/:id',
  [verificaToken, verificaAdminRole],
  function (req, res) {
    let id = req.params.id;

    let estadoActualizado = {
      estado: false,
    };

    Materia.findByIdAndUpdate(
      id,
      estadoActualizado,
      { new: true },
      (err, materiaBorrada) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err,
          });
        }

        if (!materiaBorrada) {
          return res.status(400).json({
            ok: false,
            err: {
              message: 'Materia no encontrada',
            },
          });
        }

        res.json({
          ok: true,
          materia: materiaBorrada,
        });
      }
    );
  }
);

module.exports = app;
