'use strict'

var jwt = require("jwt-simple")
var moment = require("moment")
var secret = 'clave_secreta_IN6BM_Proyect_users'

exports.createToken = function(users){
    
    var payload ={

        id_sub: users._id,
        name: users.name,
        lastname: users.lastname,
        usuario: users.usuario,
        email: users.email,
        phone_number: users.phone_number,
        iat: moment().unix(),
        exp: moment().day(30,'days').unix()

    } 
    
    return jwt.encode(payload,secret)
}