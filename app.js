'use strict'

const express = require("express")
const app = express();
const bodyParser = require("body-parser")

//Cargar de rutas
var hotels_routes = require('./src/routes/routeshotel')
var user_routes = require("./src/routes/userroutes")



//MidleWares
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

    // cabeceras 
    app.use((req,res,next)=>{
        res.header('Acces-control-Allow-Origin','*');
        res.header('Acces-control-Allow-Headers','Autorization,X-API-KEY,Origin,X-Requested-with,Content-Type,Accept,Access-Control-Allow-Request-Method')
        res.header('Acces-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE')
        res.header('Allow','GET,POST,OPTIONS,PUT,DELETE')

        next();
    })

app.use('/api',hotels_routes,user_routes)

// Exportar
module.exports = app;