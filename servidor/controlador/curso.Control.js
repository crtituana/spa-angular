const Curso = require('../modelos/curso.Model');

let get = (req, res) => {
  Curso.find()
    .then((data) => {
      res.status(200).json({
        ok: true,
        data: data,
        msg: 'Datos encontrados',
        token: req.token,
      });
    })
    .catch((err) => {
      res.status(500).json({
        ok: false,
        data: null,
        msg: err,
      });
    });
};

let getByID = (req, res) => {
  let { _id } = req.params;

  Curso.find({ _id })
    .then((data) => {
      res.status(200).json({
        ok: true,
        data: data,
        msg: 'Datos encontrados',
        token: req.token,
      });
    })
    .catch((err) => {
      res.status(500).json({
        ok: false,
        data: null,
        msg: err,
      });
    });
};

let post = (req, res) => {
  let { data } = req.body;

  Curso.create(data)
    .then((data) => {
      res.status(200).json({
        ok: true,
        data: data,
        msg: 'Datos creados',
        token: req.token,
      });
    })
    .catch((err) => {
      res.status(500).json({
        ok: false,
        data: null,
        msg: "No se pudo crear el curso",
      });
    });
};

let patch = (req, res) => {
  let { _id } = req.params,
    { data } = req.body;

  Curso.updateOne({ _id }, { $set: data })
    .then((data) => {
      res.status(200).json({
        ok: true,
        data: data,
        msg: 'Datos actualizados correctamente',
        token: req.token,
      });
    })
    .catch((err) => {
      res.status(500).json({
        ok: false,
        data: null,
        msg: err,
      });
    });
};

let deleteOne = (req, res) => {
  let { _id } = req.params;

  Curso.deleteOne({ _id })
    .then((data) => {
      res.status(200).json({
        ok: true,
        data: data,
        msg: 'Datos eliminados',
        token: req.token,
      });
    })
    .catch((err) => {
      res.status(500).json({
        ok: false,
        data: null,
        msg: err,
      });
    });
};

module.exports = {
  get,
  getByID,
  post,
  patch,
  deleteOne,
};
