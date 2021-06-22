const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//aqui definimos, haciendo referencia a base de datos de mysql) las tablas de nuestro back
let rolesValidos = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} no es un rol valido',
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es necesario'],
  },
  apellido: {
    type: String,
    required: [true, 'El apellido es necesario'],
  },
  fechaIngreso: {
    type: String,
    required: [true, 'Fecha de ingreso es necesaria'],
  },
  contacto: {
    type: Number,
    required: [true, 'El numero de telefono es necesario'],
  },
  nombreInstit: {
    type: String,
    default: 'Codeschool',
  },
  contactoInstit: {
    type: String,
    required: [true, 'El contacto de la institucion es necesario'],
  },
  direccion: {
    type: String,
    required: [true, 'La direccion es necesaria'],
  },

  email: {
    type: String,
    required: [true, 'El mail es necesario'],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    default: 'ADMIN_ROLE',
    enum: rolesValidos,
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

usuarioSchema.plugin(uniqueValidator, {
  message: '{PATH} debe ser unico',
});

usuarioSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

module.exports = mongoose.model('Usuario', usuarioSchema);
