const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;
let alumnoSchema = new Schema({
  nombreCompleto: {
    type: String,
    required: [true, 'El nombre y apellido del alumno son requeridos'],
  },
  año: {
    type: String,
    required: [true, 'El año de cursado es requerido'],
  },
  expediente: {
    type: String,
    required: [true, 'El numero de expediente es necesario'],
    unique: true,
  },
  cuota: {
    type: Boolean,
    required: [true, 'Necesario saber si abonó'],
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

alumnoSchema.plugin(uniqueValidator, {
  message: '{PATH} debe ser unico',
});

module.exports = mongoose.model('Alumno', alumnoSchema);
