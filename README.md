# Sistema de votación - Ejercicio programación 2025
## 1. Introducción
Este es un sistema de votación desarrollado como parte de un ejercicio solicitado. La aplicación permite registrar votos de personas con documentos habilitados en la base de datos y proporciona a un usuario administrador acceso para gestionar tanto los votos como los votantes.

### Tecnologías utilizadas:
- Front-end: React.js, Vite, React Router Dom, Context API, Material UI.
- Back-end: Node.js, Express.js, mysql2, bcrypt, JWT, nodemon, dotenv.
- Base de datos: MariaDB, con consultas SQL optimizadas.

## 2. Instalación y configuración
### Requisitos previos
Asegúrate de tener las siguientes herramientas instaladas en tu sistema:

- Node.js (v22 o superior)
- MariaDB o MySQL (dependiendo de la base de datos que utilices)
- npm 

### Clonación del proyecto desde GitHub
Clona el repositorio en tu máquina local:

`git clone https://github.com/nicoreyesaglh/vote-system.git`
`cd vote-system`

### Configuración del entorno
- Archivo .env en la carpeta server
Dentro de la carpeta server, crea un archivo .env con la siguiente configuración:

``` 
PORT=4000                 # Puerto en el que el servidor de Node.js escuchara
DB_USER=                  # Usuario de la base de datos
DB_PASS=                  # Contraseña de la base de datos
DB_HOST=                  # Dirección del servidor de base de datos
JWT_SECRET=               # Clave secreta para la generación de JWT (ej. secret-key-votes)
```
Asegúrate de reemplazar los valores con los de tu propio entorno.

- Archivo .env en la carpeta client
Dentro de la carpeta client, crea un archivo .env con la siguiente configuración:

```
VITE_PORT=5173           # Puerto por defecto en el que el cliente (front-end) escuchará
VITE_API_BASE_ENDPOINT=http://localhost:4000/api/execute   # Dirección base para las API del back-end
```

## 3. Ejecución del proyecto
### 1. Configuración y ejecución del servidor (Back-end)
Primero, dentro de la carpeta server, corre el siguiente comando para instalar las dependencias necesarias y configurar la base de datos con datos precargados:

```
cd server
npm run setup
```

Este comando realizará dos acciones:

- Instalará todas las dependencias necesarias.
 - Inicializará la base de datos con datos de ejemplo, incluyendo una cuenta de administrador con las siguientes credenciales:
 - Email: admin@test.com
 - Contraseña: admin123

Luego de completar el paso anterior, levanta el servidor con:
```
npm run dev
```
Esto iniciará el servidor en el puerto 4000 (por defecto) y expondrá las APIs.

### 2. Configuración y ejecución del cliente (Front-end)
Dentro de la carpeta client, primero instala las dependencias necesarias ejecutando:

```
cd client
npm install
```

Luego, levanta el cliente con:
```
npm run dev
```
El cliente debería estar corriendo en la siguiente URL:
http://localhost:5173

Recuerda que el cliente interactúa con el servidor (back-end) en http://localhost:4000 por defecto, así que asegúrate de que ambos estén corriendo para un funcionamiento correcto.

## 4. API en Back-end
### Rutas y Funciones
A continuación se detallan las rutas disponibles en la API, organizadas por funcionalidad:

### 1. Autenticación
- POST /login: Inicia sesión y devuelve un JWT para autenticarse en las siguientes peticiones.

Request Body:

```
{
  "email": "admin@test.com",
  "password": "admin123"
}
```
Response:

```
{
  "message": "Login exitoso!",
  "token": "JWT_TOKEN",
  "user": {
    "id": 1,
    "email": "admin@test.com"
  }
}
```
- POST /modifyPassword: Permite al admin cambiar su contraseña actual por una nueva (requiere autenticación).

Request Body:

```
{
  "email": "admin@test.com",
  "oldPassword": "admin123",
  "newPassword": "newAdmin123"
}
```
Response:

```
{
  "message": "Contraseña cambiada correctamente."
}
```

### 2. Votación
- POST /vote: Permite registrar un voto de un votante ya habilitado.

Request Body:

```
{
  "document": "12345678",
  "candidate_id": 1
}
```
Response:

```
{
  "message": "Votación registrada correctamente"
}
```

- POST /createVoter: Permite crear un nuevo votante (requiere autenticación).

Request Body:

```
{
  "name": "John",
  "lastName": "Doe",
  "document": "12345678",
  "dob": "1990-01-01",
  "is_candidate": false,
  "address": "Calle Ficticia 123",
  "phone": "555123456",
  "gender": "M"
}
```
Response:

```
{
  "message": "Votante creado correctamente"
}
```

- GET /getVotes: Obtiene todos los votos registrados con paginación.

Request Query:

```
{
  "page": 1,
  "limit": 5
}
```
Response:

```
{
  "data": [/* votos */],
  "totalVotes": 100,
  "totalPages": 10,
  "currentPage": 1,
  "votesPerPage": 5
}
```

- GET /getCandidates: Obtiene todos los candidatos registrados.

Response:

```
[
  { "id": 1, "name": "John", "lastName": "Doe" },
  { "id": 2, "name": "Jane", "lastName": "Smith" }
]
```

- POST /getVoteData: Obtiene los datos de un voto específico.

Request Body:

```
{
  "vote_id": 1
}
```
Response:

```
{
  "id": 1,
  "voter_id": 1,
  "candidate_voted_id": 2,
  "date": "2025-02-11",
  "voter": { /* datos del votante */ },
  "candidate": "Jane Smith"
}
```

- GET /getTopVotedCandidates: Obtiene los candidatos más votados.

Response:

```
[
  { "id": 1, "candidate": "John Doe", "total_votes": 50 },
  { "id": 2, "candidate": "Jane Smith", "total_votes": 30 }
]
```

## 6. Autenticación
La autenticación en la API se realiza utilizando JSON Web Token (JWT). Cuando el usuario (admin) inicia sesión correctamente, se le devuelve un token que debe ser incluido en las cabeceras de las solicitudes que requieren autenticación.

### Generación del Token
Cuando el usuario inicia sesión a través de la ruta /login, se genera un token JWT que tiene una duración de 1 día. Este token se debe enviar en el encabezado Authorization de las peticiones para acceder a rutas protegidas.

Ejemplo de cómo enviar el token en el encabezado de una solicitud:

```
GET /api/getVotes
Authorization: Bearer {JWT_TOKEN}
```

### Middleware de Autenticación
En las rutas protegidas, se utiliza un middleware para verificar que el token enviado sea válido. Si el token es válido, el servidor permite que la solicitud continúe, agregando la información del usuario decodificada en el objeto req.user.

Ejemplo de una ruta protegida que utiliza el middleware:

```
router.post("/modifyPassword", authMiddleware, authController.modifyPassword);
```
Si el token no es proporcionado o es inválido, el servidor devolverá un error con código de estado 401 (Unauthorized).

### Hecho por Nicolás Reyes, 2025
