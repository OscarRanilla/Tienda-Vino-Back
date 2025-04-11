const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./config/cloudinary');

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true); // ✅ Aceptado
    } else {
      cb(new Error('Solo se permiten imágenes (jpg, jpeg, png, webp).'), false); // ❌ Rechazado
    }
  };
  

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wines', // Carpeta en Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg','webp'],
  },
});

const upload = multer({ storage: storage, fileFilter });

module.exports = upload;


