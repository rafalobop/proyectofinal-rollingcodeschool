const express = require("express");
const Curso = require("../modelos/materia");

const {
  verificaToken,
  verificaAdmin_role,
} = require("../middlewares/autenticacion");

const _ = require("underscore");
const app = express();

app.get("/materia", function (req, res) {
  // res.json("GET usuarios");

  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 5;
  limite = Number(limite);

  Materia.find({ estado: true })
    .limit(limite)
    .skip(desde)
    .sort("nombreMateria") 
    .populate("descripcion", "anio")
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

app.get("/materias/:id", function (req, res) {
  

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

app.post("/materias", [verificaToken, verificaAdmin_role], function (req, res) {


  let body = req.body;

  let materia = new Materia({

    nombreMateria: body.nombreMateria,
    detalle: body.detalle,
    imagen: body.imagen,
    nota: body.nota,
    ano: body.ano,
    
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
  "/materia/:id",
  [verificaToken, verificaAdmin_role],
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
  "/materia/:id",
  [verificaToken, verificaAdmin_role],
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
              message: "Materia no encontrada",
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