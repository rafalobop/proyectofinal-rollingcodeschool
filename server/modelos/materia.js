const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let materiaSchema = new Schema({
  nombreMateria: {
    type: String,
    required: [true, "El nombre de la Materia es necesario"],
  },
  detalle: {
    type: String,
    required: true,
  },
  imagen: {
    type: String,
    required: false,
  },
  nota:{
    type: String,
    required: [true, "La nota del alumno es necesaria"],
  },
  anio:{
      type: String,
      require: true,
  },
  alumno: {
    type: Schema.Types.ObjectId,
    ref: "Alumno",
  },
 
});

materiaSchema.plugin(uniqueValidator, {
  message: "{PATH} debe ser único",
});

module.exports = mongoose.model("Materia", materiaSchema);
