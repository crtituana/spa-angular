const express = require('express'),
  multiParty = require('connect-multiparty');

let api = express.Router(),
  authControl = require('../controlador/middleware/auth.control'),
  filesControl = require('../controlador/files.Control'),
  galeriaMiddleware = multiParty({ uploadDir: './files/galeria' }),
  videosMiddleware = multiParty({ uploadDir: './files/videos' }),
  pdfMiddleware = multiParty({ uploadDir: './files/pdf' });



api.get('/files/:directory/:urlFile', filesControl.showFiles);

api.post('/files_galeria', authControl.auth, galeriaMiddleware, filesControl.uploadFile);
api.post('/files_videos', videosMiddleware, filesControl.uploadFile);
api.post('/files_pdfs', pdfMiddleware, filesControl.uploadFile);
api.delete('/files/:directory/:urlFile', filesControl.deleteFiles);
api.put( '/files/:directory/:urlFile', galeriaMiddleware, filesControl.modifyFiles);
api.put('/files/:directory/:urlFile', videosMiddleware, filesControl.modifyFiles);
api.put('/files/:directory/:urlFile', pdfMiddleware, filesControl.modifyFiles);

module.exports = api;
