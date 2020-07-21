const bcrypt = require('bcrypt');

//Middleware(next) nos permite dar paso al siguiente proceso.
let codificarPassword = (req, res, next) => {
  let { data } = req.body || null;

  console.log(data);
  if (!data || !data.password || data.password == '') {
    return res.status(200).send('Clave invalida');
  } else {
    let codificarPassword = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10));
    req.body.data.password = codificarPassword;
    req.body.data.createAt = new Date();
    req.body.data.sessionID = req.sessionID;

    next();
  }
};

module.exports = { 
  codificarPassword 
};
