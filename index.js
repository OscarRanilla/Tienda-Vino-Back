const express =require ('express');
require('dotenv').config();
const {dbConnection} =require ('./config/config')
const routes=require('./routes/wineRoutes');
const contactRoutes = require('./routes/contact');


const app=express();
const PORT =process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({extended:true}));


//Middleware para controlar que la imagen que se sube tiene un formato validO
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      // Error de Multer (por ejemplo, tamaño de archivo)
      return res.status(400).json({ error: err.message });
    } else if (err) {
      // Otro tipo de error
      return res.status(400).json({ error: err.message });
    }
  
    next();
  });
  

app.use('/', routes);
app.use('/', contactRoutes); 

dbConnection();


app.listen(PORT,()=>{
    console.log(`Server started on port http://localhost:${PORT}`)
})
