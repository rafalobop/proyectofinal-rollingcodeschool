const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;
let alumnoSchema = new Schema({
  nombreCompleto: {
    type: String,
    required: [true, 'El nombre y apellido del alumno son requeridos'],
  },
  year: {
    type: String,
    required: [true, 'El año de cursado es requerido'],
  },
  expediente: {
    type: String,
    required: [true, 'El numero de expediente es necesario'],
    unique: true,
  },
   domicilio: {
    type: String,
    required: [true, 'Debe ingresar el domicilio  del alumno'],
  },
  contacto: {
    type: String,
    required: [true, 'El numero de contacto es necesario'],
  },
  fechaNacimiento: {
    type: String,
    required: [true, 'Debe ingresar la fecha de nacimiento del alumno'],
  },
  dni: {
    type: String,
    required: [true, 'El numero de dni es necesario'],
  },
  cuota: {
    type: String,
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
