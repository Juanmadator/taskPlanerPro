Proyecto de Gestión de Tareas con Node.js
Este proyecto es una aplicación de gestión de tareas que incluye funcionalidades avanzadas como la gestión de imágenes, autenticación de usuarios, envío de correos electrónicos, y notificaciones en tiempo real mediante WebSockets. Está desarrollado utilizando Node.js, Mongoose, y MongoDB, y cuenta con una arquitectura modular que incluye middlewares, modelos, validaciones y enrutamiento.

Funcionalidades Principales
1. Gestión de Imágenes
Se ha implementado la funcionalidad para subir, mostrar y eliminar imágenes utilizando Multer.
Las imágenes se almacenan en un directorio local y se pueden gestionar a través de rutas protegidas por autenticación.
2. Autenticación y Autorización
Se ha añadido un sistema de login y registro utilizando bcrypt para el hash de contraseñas.
La autenticación de usuarios se realiza mediante JWT (JSON Web Tokens).
Los usuarios con rol de admin tienen permisos para realizar operaciones de crear, actualizar y eliminar tareas.
Los usuarios que no son admin solo pueden visualizar todas las tareas disponibles.
3. Envío de Correos Electrónicos
Se ha integrado NodeMailer para el envío automático de correos electrónicos al registrarse un usuario.
Los correos incluyen un mensaje de verificación para confirmar la creación de la cuenta.
4. Notificaciones en Tiempo Real
Se ha implementado WebSocket para enviar mensajes en tiempo real a todos los usuarios cuando se realiza una actualización en las tareas (crear, actualizar o eliminar).
Esto permite a los usuarios estar sincronizados con los cambios realizados en la aplicación.
5. Gestión de Tareas
Los usuarios pueden gestionar tareas con las siguientes características:
Crear, editar y eliminar tareas (solo para administradores).
Visualizar tareas:
Los usuarios no admin pueden ver todas las tareas.
Los usuarios admin solo pueden ver y gestionar sus propias tareas.
Las tareas incluyen campos como título, descripción, estado y fecha de finalización.
Tecnologías Utilizadas
Node.js: Entorno de ejecución para el backend.
Express.js: Framework para la creación de rutas y middlewares.
MongoDB: Base de datos NoSQL para almacenar usuarios, tareas e imágenes.
Mongoose: ODM para modelar los datos en MongoDB.
Multer: Middleware para la gestión de archivos (imágenes).
bcrypt: Para el hash de contraseñas.
JWT (JSON Web Tokens): Para la autenticación de usuarios.
NodeMailer: Para el envío de correos electrónicos.
WebSocket: Para la comunicación en tiempo real.
HTML, CSS y JavaScript: Para el frontend.