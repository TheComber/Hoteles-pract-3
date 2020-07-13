'use strict'

var jwt = require("jwt-simple")
var moment = require("moment")
var secret = 'clave_secreta_IN6BM_Proyect_hotels'


exports.createToken = function(hotels){
    
    var payload ={

        sub: hotels._id,
        name: hotels.name,
        address: hotels.lastname,
        phone_number: hotels.phone_number,
        qualifications: hotels.qualifications,
        general_price: hotels.general_price,
        email: hotels.email,

        start_date: hotels.start_date,
        end_date:hotels.end_date,

        iat: moment().unix(),
        exp: moment().day(30,'days').unix()

    } 
    
    return jwt.encode(payload,secret)
}