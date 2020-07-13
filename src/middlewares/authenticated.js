'use strict'

var jwt = require("jwt-simple")
var moment = require("moment")
var secret = 'clave_secreta_IN6BM_Proyect_users'

exports.ensureAuth = function(req ,res,next){


    if(!req.headers.authorization){
       return res.status(403).send({message:'The request does not have the authentication header'}) 
    }

    var token = req.headers.authorization.replace(/['"]+/g,'');

    try{
        var payload = jwt.decode(token ,secret)

        if(payload.exp <= moment().unix()){
            return res.status(401).send({
                message: 'The token has expired'
            })
        }

        }catch (ex){
            return res.status(404).send({
                message:'the token is not valid'
            })
        }

    req.users = payload;
    next();
}

