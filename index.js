'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');


const uri = config.db;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // autoIndex: false, // Don't build indexes
    // poolSize: 10, // Maintain up to 10 socket connections
    // serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    // family: 4 // Use IPv4, skip trying IPv6
};

mongoose.connect(uri, options).then(
    /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */
    () => { 
        console.log('Conexion a la DB establecida')
        app.listen(config.port, () => {
        console.log(`API REST corriendo en http://localhost:${config.port}`)
        })
    }, 
    err => { throw err } /** handle initial connection error */
);
