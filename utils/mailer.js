const nodemailer = require('nodemailer');
const logger = require('./logger'); 


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,     // correo de soporte
    pass: process.env.EMAIL_PASS      // Contraseña de aplicación
  }
});

//* prueba la conexión:

transporter.verify()
  .then(() => logger.info('✓ Nodemailer listo'))
  .catch(err => logger.error(`✗ Error Nodemailer: ${err.message}`));


module.exports = transporter;