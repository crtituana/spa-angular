const jwt = require('jsonwebtoken'),
  Rol = require('../../modelos/rol.Model');
  

let adminRol = (req, res, next) => {
  let token = req.headers.authorization || null;

  jwt.verify(token, process.env.KEY_JWT, (err, decode) => {
    if (err) {
      return res.status(400).json({
        data: err,
        msg: 'Token invalido',
      });
    } else {
      Rol.find({ _id: decode.data.role })
        .then((data) => {
          if (data[0].name === 'Administrador') {
            next();
          } else {
            res.status(401).json({
              ok: false,
              data: null,
              msg: 'No tienes los permisos necesarios',
            });
          }
        })
        .catch((err) => {
          console.log('No encontrado');
        });
    }
  });
};

let clientRol = (req, res, next) => {
  let token = req.headers.authorization || null;

  jwt.verify(token, process.env.KEY_JWT, (err, decode) => {
    if (err) {
      return res.status(400).json({
        data: err,
        msg: 'Token invalido',
      });
    } else {
      Rol.find({ _id: decode.data.role })
        .then((data) => {
          if (data[0].name === "client") {
            next();
          } else {
            res.status(401).json({
              ok: false,
              data: null,
              msg: 'No tienes los permisos necesarios',
            });
          }
        })
        .catch((err) => {
          console.log('No encontrado');
        });
    }
  });
};

module.exports = {
  adminRol,
  clientRol,
};
