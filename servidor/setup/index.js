;
'use strict'

const env = require('dotenv').config(),
      app = require('./app'),
      port = process.env.PORT || 3000,
      fs = require('fs'),
      httpsOptions = {
      key: fs.readFileSync('./seguridad/key.pem'),
     cert: fs.readFileSync('./seguridad/cert.pem'),
  };

let https = require('https').Server(httpsOptions, app);

https.listen(port, (err) => {
  if(!err){
    console.log(`El servicio esta funcionando en el puerto http://localhost:${port}`)
}
else
{
    console.log('El servicio no esta funcionando');
}
})
