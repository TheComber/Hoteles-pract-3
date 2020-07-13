'use strict'

var bcrypt =require("bcrypt-nodejs");
var Usuario = require('../models/users')
var jwt = require("../services/jwt_users")
var moment = require("moment")

/* function registrarusuario(req, res){
    var user = new Usuario();
    var params = req.body;

    if(params.name && params.lastname && params.phone_number && params.email && params.usuario ){
        user.name = params.name;
        user.lastname = params.address;
        user.phone_number = params.phone_number;
        user.
    
    


        Hotels.find({$or:[
            {names: hotels.name},
            {email: hotels.email}
        ] }).exec((err,names)=>{
            if(err)return res.status(500).send({message:'Error en la peticion de usuarios'})
            if(names && names.length >= 1){
                return res.status(500).send({message: 'el usuario ya existe'})

            }else{
                bcrypt.hash(params.password, null,null,(err,hash)=>{
                    hotels.password = hash;
                    hotels.save((err,hotelGuardado)=>{
                        if(err)return res.status(500).send({message:'Error al guardar'})
                        if(hotelGuardado){
                            res.status(200).send({ hotelGuardado})
                            
                        }else{
                            res.status(404).send({message: 'No se ha registrado el usuario'})
                        }

                    })
                })
            }   
        })
    }   else{
        res.status(200).send({
            message: 'Rellene todos los datos necesarios'
        })  
    }
    
   
} */