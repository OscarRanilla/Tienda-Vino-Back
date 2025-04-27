# Tienda-Vino-Back 🍷

Backend para gestionar vinos, autenticación de usuarios con Firebase, carga de imágenes en Cloudinary y envío de correos de contacto.

## Tecnologías y dependencias

- **express**: Framework web para Node.js
- **mongoose**: ODM para MongoDB
- **firebase / firebase-admin**: Autenticación y verificación de tokens
- **dotenv**: Manejo de variables de entorno
- **cloudinary / multer / multer-storage-cloudinary**: Subida y almacenamiento de imágenes
- **cors**: Permitir solicitudes desde otros dominios
- **cookie-parser**: Lectura de cookies para sesiones
- **nodemailer**: Envío de correos desde el formulario de contacto
- **winston**: Logger para errores y eventos

---

# Rutas disponibles
## Autenticación
##### POST	     /register	    Registra/verifica un nuevo usuario
##### POST	    /login	        Inicia sesión y guarda cookie con el token
##### GET	        /logout	        Elimina la cookie y cierra sesión
##### GET	        /checkSession	Verifica si la sesión está activa
##### GET	        /dashboard	    Ruta protegida, requiere sesión



##  Contacto
##### POST	       /contact 	Envía un correo desde el formulario



## Gestión de vinos
##### POST	      /wines/create	    Crea un nuevo vino (con imagen)
##### GET	         /wines/            Obtiene todos los vinos
##### GET	         /wines/id/:_id	    Obtiene un vino por ID
##### DELETE     	/wines/id/:_id	    Elimina un vino por ID
##### PUT	        /wines/update/:id   Actualiza un vino por ID (imagen opcional)


## 🛒 Checkout Test (simulación de compra)
####   Método	   Ruta	          Descripción


##### POST	    /checkout-test	     Simula un resumen de compra y envía un correo con el detalle


⚡ Nota: El endpoint /checkout-test simula un proceso de compra pero no procesa pagos reales, solo envía un email de prueba.
