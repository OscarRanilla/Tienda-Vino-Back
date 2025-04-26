const express = require('express');
const router = express.Router();
const transporter = require('../utils/mailer');
const logger = require('../utils/logger'); 

//* Ruta de prueba para compra online con email en HTML:
router.post('/', async (req, res) => {
  const { cart } = req.body; // array de items { id, name, image, price, quantity }

  // Construimos las filas de la tabla:
  const rowsHtml = cart.map(item => `
    <tr>
      <td style="padding:8px; text-align:center;">
        <img src="${item.image}" width="60" style="border-radius:4px;" alt="${item.name}"/>
      </td>
      <td style="padding:8px;">${item.quantity}× ${item.name}</td>
      <td style="padding:8px; text-align:right;">€${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  `).join('');

  // tabla completa:
  const htmlEmail = `
    <div style="font-family:sans-serif; color:#333;">
      <h2>¡Gracias por probar nuestro checkout!</h2>
      <table style="width:100%; border-collapse:collapse; margin-top:16px;">
        <thead>
          <tr style="background:#fafafa;">
            <th style="padding:8px; text-align:center;">Imagen</th>
            <th style="padding:8px; text-align:left;">Producto</th>
            <th style="padding:8px; text-align:right;">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
      <p style="margin-top:16px; font-style:italic; color:#666;">
        Esto es solo una simulación, no se procesó ningún cargo.
      </p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Simulación Falcon" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: 'Resumen de tu compra (simulación)',
      html: htmlEmail
    });
    return res.json({ success: true, message: 'Test email sent' });
  } catch (err) {
    logger.error(`Error sending test email: ${err.message}`);
    return res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

module.exports = router;
