
'use strict'
 
var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var Schema_users = Schema({

    name: String,
    lastname: String,
    phone_number: String,
    email: String,
    passwords: String,
    usuario: String


    
})

module.exports = mongoose.model('users',Schema_hotels)