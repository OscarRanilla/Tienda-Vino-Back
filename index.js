
const express =require ('express');
require('dotenv').config();
const {dbConnection} =require ('./config/config')
const routes=require('./routes/wineRoutes');


const app=express();
const PORT =process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/', routes);

dbConnection();

app.listen(PORT,()=>{
    console.log(`Server started on port http://localhost:${PORT}`)
})
