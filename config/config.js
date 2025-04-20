const mongoose = require('mongoose');
require ('dotenv').config();

const dbConnection =async()=>{
    try{

       // await mongoose.connect(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 60000,  // Aumenta el tiempo de espera a 60 segundos
            socketTimeoutMS: 45000,  // Tiempo de espera para la conexión de socket
        });
        console.log('BBDD conectada correctamente')
    }catch(error){
        console.log(`Error al conectar con la bbdd: ${error}`)
    }
}

 
module.exports = {
    dbConnection,
};




