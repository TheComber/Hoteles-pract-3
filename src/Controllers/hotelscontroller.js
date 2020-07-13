 'use strict'

var bcrypt =require("bcrypt-nodejs");
var Hotels = require('../models/hotels')
var jwt = require("../services/jwt_hotels")
var moment = require("moment")

function registrar(req, res){
    var hotels = new Hotels();
    var params = req.body;

    if(params.name && params.address && params.phone_number && params.email && params.qualifications && params.general_price && params.start_date && params.end_date ){
        hotels.name = params.name;
        hotels.address = params.address;
        hotels.phone_number = params.phone_number;
        hotels.email = params.email;
        hotels.qualifications = params.qualifications;
        hotels.general_price  = params.general_price;
        hotels.start_date = params.start_date;
        hotels.end_date = params.end_date;


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
    
   
}


function login(req, res){
    var params = req.body;

    Hotels.findOne({email: params.email},(err,hotels)=>{
        if(err)return res.status(500).send({message:'Error en la peticion'})

        if(hotels){
            bcrypt.compare(params.password , hotels.password,(err ,check)=>{
                if(check){
                    // parametros temporales
                    if(params.gettoken){
                        return res.status(200).send({
                            token:jwt.createToken(hotels)
                        })
                    }else{
                        hotels.password = undefined;
                        return res.status(200).send({hotels})
                    }
                }else{
                    return res.status(404).send({message: 'el usuario no se ha podido identificar'})
                }
            })
        }else{
            return res.status(404).send({message: 'El usuario no se ha podido logear'})
        }
    })
    
                
}


function editarhotels(req, res){

    var hotelsId = req.params.id;
    var params = req.body

    //Borrar la propiedad de password para no ser editada
    delete params.password

    if(hotelsId != req.hotels.sub){
        return res.status(500).send({message:'No tiene los permisos para editar este usuario'})

    }
    Hotels.findByIdAndUpdate(hotelsId,params,{new: true},(err, actualizado)=>{
        if(err)return res.status(500).send({message: 'Erros en la peticion'})
    
        if(!actualizado)return res.status(404).send({message:'No se ha podido Actualizar los datos'})
        return res.status(200).send({editarhotel: actualizado})

    })
}



function Delete(req ,res){
    var hotelsId = req.params.id;

    //User.findById(userId ,(err, usuarioEliminado)=>{
     //   usuarioEliminado.remove
    //})

     if(hotelsId != req.hotels.sub){

        return res.status(500).send({message:'Usted no tiene permiso para eliminar el usuario'})

        }
        Hotels.findByIdAndDelete(hotelsId,(err, Eliminado)=>{

        if (err)  return res.status(500).send({message:'Erros en la peticion de eliminar el usuario'})
        if(!Eliminado) return res.status(404).send({message: 'Error al eliminar el usuario'})

        return res.status(200).send({ Eliminado})
    })
}

function buscarporcalificaciones(req ,res) {
    
    Hotels.find((err,calificaciones)=>{
        if(err)  return res.status(500).send({message:'error en la peticion'})

        if(!calificaciones){        
                return res.status(404).send({message:'error en la calificaciones'})
    }else{
        return res.status(200).send({})
    }
    
    })
}

module.exports  ={  
    registrar,login,editarhotels,Delete

}