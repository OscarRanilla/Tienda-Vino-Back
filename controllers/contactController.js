const transporter = require('../utils/mailer');
const logger = require('../utils/logger'); 

const sendContactEmail = async (req, res) => {
  const { name, phone, address, email, mensaje } = req.body;

  if (!name || !phone || !address || !email || !mensaje) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.EMAIL_USER,  // tu correo de soporte
    subject: 'Nuevo mensaje desde el formulario de contacto',
    html: `
      <h2>Mensaje de contacto</h2>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Teléfono:</strong> ${phone}</p>
      <p><strong>Dirección:</strong> ${address}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mensaje:</strong><br/>${mensaje}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully.' });
  } catch (error) {
    logger.error("Error sending email: %s", error.message);
    res.status(500).json({ error: 'Error sending message.' });
  }
};

module.exports = { sendContactEmail };
