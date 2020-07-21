const User = require('../modelos/usuario.Model'),
  bcrypt = require('bcrypt'),
  jwt = require('jsonwebtoken');

let getUsers = (req, res) => {
  User.find()
    .then((data) => {
      res.status(200).json({
        ok: true,
        data: data,
        msg: 'Usuarios encontrados',
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

let getUserByID = (req, res) => {
  let { _id } = req.params;

  User.find({ _id })
    .then((data) => {
      res.status(200).json({
        ok: true,
        data: data,
        msg: 'Usuarios encontrados pot Id',
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

let getUserByName = (req, res) => {
  let { name } = req.params;

  User.find({ name })
    .then((data) => {
      res.status(200).json({
        ok: true,
        data: data,
        msg: 'Usuarios encontrados por nombre',
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

let postUser = (req, res) => {
  let { data } = req.body;

  User.create(data)
    .then((data) => {
      res.status(200).json({
        ok: true,
        data: data,
        msg: 'Usuario creado',
        token: req.token,
      });
    })
    .catch((err) => {
      res.status(500).json({
        ok: false,
        data: null,
        msg: "No se pudo crear el usuario",
      });
    });
};

let postUsers = (req, res) => {
  let { data } = req.body; //Array de Objetos

  User.insertMany(data)
    .then((data) => {
      res.status(200).json({
        ok: true,
        data: data,
        msg: 'Datos actualizados',
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

let patchUser = (req, res) => {
  let { _id } = req.params,
    { data } = req.body;

  User.updateOne({ _id }, { $set: data })
    .then((data) => {
      res.status(200).json({
        ok: true,
        data: data,
        msg: 'Usuario actualizado',
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

let deleteUser = (req, res) => {
  let { _id } = req.params;

  User.deleteOne({ _id })
    .then((data) => {
      res.status(200).json({
        ok: true,
        data: data,
        msg: 'Usuario eliminado',
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

let loginUsers = (req, res) => {
  let { data } = req.body,
    email = data.email,
    password = data.password;

  User.find({ email })
    .then((data) => {
      let token,
        tokenBody = {
          name: data[0].name,
          email: data[0].email,
          role: data[0].role,
          sessionID: data[0].sessionID,
        };

      bcrypt.compareSync(password, data[0].password)
        ? ((token = jwt.sign({ data: tokenBody }, process.env.KEY_JWT, {
            algorithm: "HS256",
            expiresIn: 300,
          })),
          res.status(200).json({
            ok: true,
            data: null,
            msg: 'Usuario encriptado',
            token,
          }))
        : res.status(404).json({
            ok: false,
            data: null,
            msg: 'Clave Incorrecta',
            token: null,
          });
    })
    .catch((err) => {
      res.status(404).json({
        ok: false,
        data: null,
        msg: 'Email no encontrado',
      });
    });
};

module.exports = {
  getUsers,
  getUserByID,
  getUserByName,
  postUser,
  postUsers,
  patchUser,
  deleteUser,
  loginUsers,
};
