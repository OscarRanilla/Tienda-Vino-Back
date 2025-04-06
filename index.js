
const express =require ('express');
require('dotenv').config();
const {dbConnection} =require ('./config/config')


const app=express();
const PORT =process.env.PORT || 3000;


dbConnection();

app.listen(PORT,()=>{
    console.log(`Server started on port http://localhost:${PORT}`)
})
