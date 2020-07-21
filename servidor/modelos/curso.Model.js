const mongoose = require('mongoose');

const { Schema } = mongoose;

const cursoModel = Schema({
  titulo: { type: String },
  profesor: { type: String },
  descripcion: { type: String },
  tema: { type: String },
  participantes: { type: Array },
  sessionID: { type: String },
  createAt: { type: Date },
});

module.exports = mongoose.model('Curso', cursoModel);
