'use strict'
 
var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var Schema_hotels = Schema({

    name: String,
    address: String,
    phone_number: String,
    email: String,
    password: String,
    qualifications: String, // calificacion
    general_price: String, // precio general

    // fechas de inicio y fin
    start_date: Date,
    end_date: Date
    


})

module.exports = mongoose.model('hotels',Schema_hotels)

