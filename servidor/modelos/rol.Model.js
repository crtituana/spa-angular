const mongoose = require('mongoose');

const { Schema } = mongoose;

const rolModel = Schema({
  nombre: { type: String },
  descripcion: { type: String },
  createAt: { type: Date },
});

module.exports = mongoose.model('Rol', rolModel);
