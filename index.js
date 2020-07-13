'use strict'

const mongose = require("mongoose")
const app = require("./app")

mongose.Promise = global.Promise;
mongose.connect('mongodb://localhost:27017/hoteles',{ useNewUrlParser: true,useUnifiedTopology: true }).then(()=>{
    console.log('It is connected to the database');

    app.set('port',process.env.PORT || 3000)
    app.listen(app.get('port'),()=>{
        console.log(`The server is running in the port: ${app.get('port')}`);

    })
}).catch(err => console.log(err))
