const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,     // Tu correo de soporte
    pass: process.env.EMAIL_PASS      // Contraseña de aplicación
  }
});

module.exports = transporter;
