const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let materiaSchema = new Schema({
  nombreMateria: {
    type: String,
    required: [true, 'El nombre de la Materia es necesario'],
    unique: true,
  },
  nota: {
    type: String,
    required: true,
  },
  estado: {
    type: Boolean,
    default: true,
  },
   alumno: {
     type: Schema.Types.ObjectId,
     ref: 'Alumno',
   },
});

materiaSchema.plugin(uniqueValidator, {
  message: '{PATH} La materia debe ser única',
});

module.exports = mongoose.model('Materia', materiaSchema);
