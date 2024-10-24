# Proyecto de Autenticación con Passport, JWT y Mongoose

Este proyecto implementa un sistema de autenticación utilizando **Passport** con **JWT** (JSON Web Tokens) y una base de datos **MongoDB** usando **Mongoose**. Incluye rutas para el registro, inicio de sesión y protección de rutas mediante autenticación basada en JWT.

## Características principales

- **Autenticación con JWT**: Utilizamos JWT para manejar la autenticación de usuarios.
- **Passport.js**: Implementamos **Passport** para manejar las estrategias de autenticación.
- **Base de datos MongoDB**: Los usuarios y sus credenciales se almacenan en una base de datos MongoDB utilizando **Mongoose**.
- **Sesiones**: El servidor usa **express-session** y **connect-mongo** para almacenar sesiones de usuario.
- **Protección de rutas**: Rutas como `/current` están protegidas y solo accesibles para usuarios autenticados mediante JWT.

## Requisitos previos

- **Node.js** (versión 14 o superior)
- **MongoDB** (local o en la nube, como MongoDB Atlas)

## Instalación

1. Clona el repositorio a tu máquina local:
   ```bash
   git clone https://github.com/marcohzo/practica-integradora
   ```
   
2. Navega al directorio del proyecto:
   ```bash
   cd practica-integradora
   ```

3. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```

4. Crea un archivo `.env` para almacenar tus variables de entorno.

## Uso

### Ejecución del servidor

Para iniciar el servidor, ejecuta el siguiente comando en la terminal:

```bash
npm start
```

El servidor correrá en el puerto `3000` (o el puerto que hayas configurado).

### Rutas principales

#### Registro de usuarios

- **Ruta**: `POST /register`
- **Descripción**: Registra un nuevo usuario. El servidor guarda la contraseña hasheada utilizando bcrypt.
- **Cuerpo de la solicitud**:
  ```json
  {
    "first_name": "Nombre",
    "last_name": "Apellido",
    "email": "usuario@example.com",
    "password": "password123",
    "role": "user"
  }
  ```

#### Inicio de sesión

- **Ruta**: `POST /login`
- **Descripción**: Permite a un usuario iniciar sesión. Si las credenciales son correctas, genera un JWT y lo almacena en una cookie segura.
- **Cuerpo de la solicitud**:
  ```json
  {
    "email": "usuario@example.com",
    "password": "password123"
  }
  ```

#### Obtener datos del usuario autenticado

- **Ruta**: `GET /current`
- **Descripción**: Protegida con JWT. Devuelve los datos del usuario actual si el token es válido.
- **Header**:
  ```http
  Authorization: Bearer <token-jwt>
  ```

#### Redirección después de iniciar sesión

- Tras un inicio de sesión exitoso, el usuario es redirigido a la ruta `/current`.

## Estructura del proyecto

```bash
.
├── src
│   ├── config
│   │   └── passport.config.js       # Configuración de Passport.js y JWT
│   ├── models
│   │   └── user.model.js            # Modelo de usuario en Mongoose
│   ├── routes
│   │   └── users.router.js          # Rutas de usuarios (registro, login)
├── app.js                            # Archivo principal del servidor
├── authenticateJWT.js                # Middleware para autenticación JWT
├── utils.js                          # Funciones de utilidad (ej. passportCall)
├── package.json                      # Dependencias del proyecto
└── README.md                         # Este archivo
```

## Tecnologías utilizadas

- **Node.js** y **Express** para la creación del servidor.
- **Passport.js** para el manejo de autenticación con JWT.
- **Mongoose** para la conexión con la base de datos MongoDB.
- **JWT (jsonwebtoken)** para la autenticación basada en tokens.
- **bcrypt** para el hashing de contraseñas.

