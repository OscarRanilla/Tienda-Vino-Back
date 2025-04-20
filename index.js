const express =require ('express');
require('dotenv').config();
const {dbConnection} =require ('./config/config')
const winesRoutes=require('./routes/wineRoutes');
const contactRoutes = require('./routes/contact');
const authRoutes =require('./routes/authRoutes')
const cookieParser = require('cookie-parser');
const cors=require('cors');


const app=express();
const PORT =process.env.PORT || 3000;

//middelwares cors. con este Cors permite que todas nuestras rutas puedan entrar
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [process.env.URL];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


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
  

app.use('/',authRoutes)
app.use('/', winesRoutes);
app.use('/', contactRoutes); 

// Middleware para manejar rutas no encontradas (404)
app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error"
  });
});


dbConnection();


app.listen(PORT,()=>{
    console.log(`Server started on port http://localhost:${PORT}`)
})
