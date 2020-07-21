;
'use strict'


const express = require('express'),
  bodyParser = require('body-parser'),
  connectDb = require('../config/db'),
  passport = require('passport'),
  cors = require('cors'),
  parseurl = require('parseurl');

let app = express(),
  session = require('express-session'),
  fileRutas = require('../rutas/files.Ruta'),
  cursoRutas = require('../rutas/curso.Ruta'),
  usuarioRutas = require('../rutas/usuario.Ruta'),
  rolRutas = require('../rutas/roles.Ruta'),
  db = connectDb(),
  sess = {
    //SESSION CONFIG
    secret: process.env.KEY_SESSION,
    resave: false,
    saveUninitialized: true,
    name: "sessionID",
    cookie: {
      httpOnly: false,
      maxAge: parseInt(process.env.TIME),
    },
  },
  corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200,
  };

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

//Cors configuration
app.use(cors(corsOptions));

//Session
app.use(session(sess));

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Session examples to verificate
app.use((req, res, next) => {
  if (!req.session.views) {
    req.session.views = {};
  }
  let pathname = parseurl(req).pathname;
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;
  next();
});

app.get("/", (req, res) => {
  res.send(
    `Tu sesion: ${req.sessionID}, numero de visitas: ${req.session.views["/"]} tiempo`
  );
});

//Routes
app.use('/api', fileRutas);
app.use('/api', usuarioRutas);
app.use('/api', cursoRutas);
app.use('/api', rolRutas);

module.exports = app;
