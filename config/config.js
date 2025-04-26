const mongoose = require('mongoose');
require ('dotenv').config();
const logger = require('../utils/logger'); 


const dbConnection =async()=>{
    try{

        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 60000,  // Aumenta el tiempo de espera a 60 segundos
            socketTimeoutMS: 45000,  // Tiempo de espera para la conexión de socket
        });
    
        logger.info('Database connected successfully');
      }catch(error){
        logger.error('Error connecting to the database: %s', error.message);
        process.exit(1); // Salir si falla la conexión
    }
}

 
module.exports = {
    dbConnection,
};




