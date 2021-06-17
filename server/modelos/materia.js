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
    type: Number,
    required: [true, "La nota del alumno es necesaria"],
  },
  anio:{
      type: Number,
      require: true,
  },

 
});

materiaSchema.plugin(uniqueValidator, {
  message: "{PATH} debe ser único",
});

module.exports = mongoose.model("Materia", materiaSchema);
