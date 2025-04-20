# Tienda-Vino-Back 🍷

Backend para gestionar vinos, autenticación de usuarios con Firebase, carga de imágenes en Cloudinary y envío de correos de contacto.

## Tecnologías y dependencias

- **express**: Framework web para Node.js
- **mongoose**: ODM para MongoDB
- **firebase / firebase-admin**: Autenticación y verificación de tokens
- **dotenv**: Manejo de variables de entorno
- **cloudinary / multer / multer-storage-cloudinary**: Subida y almacenamiento de imágenes
- **cors**: Habilitación de CORS
- **cookie-parser**: Lectura de cookies para sesiones
- **nodemailer**: Envío de correos desde el formulario de contacto

---

## Rutas disponibles
# Autenticación
# Método	    Ruta	    Descripción
POST	     /register	    Registra/verifica un nuevo usuario
POST	    /login	        Inicia sesión y guarda cookie con el token
GET	        /logout	        Elimina la cookie y cierra sesión
GET	        /checkSession	Verifica si la sesión está activa
GET	        /dashboard	    Ruta protegida, requiere sesión



#  Contacto
# Método	    Ruta	    Descripción
POST	       /contact 	Envía un correo desde el formulario



# Gestión de vinos
# Método	    Ruta	    Descripción
POST	      /create	    Crea un nuevo vino (con imagen)
GET	         /	            Obtiene todos los vinos
GET	         /id/:_id	    Obtiene un vino por ID
DELETE     	/id/:_id	    Elimina un vino por ID
PUT	        /update/:id	    Actualiza un vino por ID (imagen opcional)