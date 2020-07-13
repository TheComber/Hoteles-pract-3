'use strict'
 
var express = require("express")
var app = express();
var md_auth = require('../middlewares/authenticated_hotels')
var controllerhotels = require("../Controllers/hotelscontroller")


var api = express.Router()

api.post('/addhotel',controllerhotels.registrar);
api.post('/loginhotels',controllerhotels.login);
api.put('/Modify/:id',md_auth.ensureAuth,controllerhotels.editarhotels);
api.delete('/Deletehotels/:id',md_auth.ensureAuth ,controllerhotels.Delete);


module.exports= api;
