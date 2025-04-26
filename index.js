const express =require ('express');
require('dotenv').config();
const {dbConnection} =require ('./config/config')
const winesRoutes=require('./routes/wineRoutes');
const contactRoutes = require('./routes/contact');
const authRoutes =require('./routes/authRoutes')
const cookieParser = require('cookie-parser');
const cors=require('cors');
const transporter = require('./utils/mailer');
const logger = require('./utils/logger'); 
const checkoutTestRoute = require('./routes/checkoutTest');


const app=express();
const PORT =process.env.PORT || 8000;

//middelwares cors. con este Cors permite que todas nuestras rutas puedan entrar
app.use(cors({
origin: (origin, callback) => {
    const allowedOrigins = [process.env.FRONTEND_URL];
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
  
  //* verifica nodemailer al arrancar
transporter.verify()
.then(() => logger.info('✓ Transporter OK'))
.catch(err => logger.error(`✗ Transporter FAIL: ${err.message}`));

//Rutas
app.use('/',authRoutes)
app.use('/wines', winesRoutes);
app.use('/', contactRoutes); 
app.use('/checkout-test', checkoutTestRoute);


// Si no se encontró ninguna ruta, creamos un error y lo pasamos
app.use((req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  next(error);
});

// Middleware para manejar todos los errores
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});



dbConnection();


app.listen(PORT,()=>{
  logger.info(`Server started on port http://localhost:${PORT}`);
})
