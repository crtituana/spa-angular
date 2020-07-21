const express = require('express'),
  multiParty = require('connect-multiparty');

let api = express.Router(),
  usuarioControl= require('../controlador/usuario.Control'),
  passwordControl = require('../controlador/middleware/password.control'),
  authControl = require('../controlador/middleware/auth.control'),
  rolControl = require('../controlador/middleware/rol.control');


//users ENDPOINT
api.get('/usuarios', authControl.auth, usuarioControl.getUsers);
api.get('/usuarios/:nombre', authControl.auth, usuarioControl.getUserByName);
api.get('/usuario/:id',[authControl.auth, rolControl.adminRol], usuarioControl.getUserByID);
api.post('/usuario', passwordControl.codificarPassword, usuarioControl.postUser);
api.post('/login', usuarioControl.loginUsers);
api.patch('/user/:_id', authControl.auth, usuarioControl.patchUser);
api.delete('/user/:_id', authControl.auth, usuarioControl.deleteUser);

module.exports = api;
