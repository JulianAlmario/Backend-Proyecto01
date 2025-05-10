# Documentación de la API

## Descripción General

Esta API para una bibliotecaproporciona funcionalidades para la gestión de usuarios, libros y reservas. Incluye endpoints para crear, leer, actualizar y eliminar recursos, además de manejar la autenticación y autorización de usuarios.

---

## Tabla de Contenidos

1. [Endpoints de Usuarios](#endpoints-de-usuarios)
2. [Endpoints de Libros](#endpoints-de-libros)
3. [Endpoints de Reservas](#endpoints-de-reservas)
4. [Esquemas](#esquemas)

---

## Endpoints de Usuarios

### 1. Registrar un Usuario
**POST** `/registro`

- **Descripción**: Crea un nuevo usuario.
- **Cuerpo de la Solicitud**:
    ```json
    {
        "nombre": "string",
        "correo": "string",
        "clave": "string"
    }
    ```
- **Respuesta**:
    - `201 Created`: Usuario creado exitosamente.
    - `400 Bad Request`: Datos faltantes o inválidos.

---

### 2. Iniciar Sesión
**POST** `/iniciar-sesion`

- **Descripción**: Autentica a un usuario y devuelve un token.
- **Cuerpo de la Solicitud**:
    ```json
    {
        "correo": "string",
        "clave": "string"
    }
    ```
- **Respuesta**:
    - `200 OK`: Inicio de sesión exitoso con token.
    - `400 Bad Request`: Credenciales inválidas.

---

### 3. Obtener Lista de Usuarios
**GET** `/lista-usuarios`

- **Descripción**: Recupera una lista de todos los usuarios, requiere token de autenticación y permisos especificos.
- **Respuesta**:
    - `200 OK`: Lista de usuarios.
    - `400 Bad Request`: Acceso no autorizado.

---

### 4. Actualizar Usuario
**PATCH** `/usuario/actualizar`

- **Descripción**: Actualiza la información de un usuario, requiere token de autenticación y permisos especificos.
- **Cuerpo de la Solicitud**:
    ```json
    {
        "id": "string",
        "nombre": "string",
        "correo": "string",
        "clave": "string",
        "rol": ["string"],
        "inabilitado": "boolean"
    }
    ```
    Nota: No es obligatoria actualizar todos los campos, solo los que se desean modificar.
- **Respuesta**:
    - `200 OK`: Usuario actualizado exitosamente.
    - `400 Bad Request`: Datos faltantes o inválidos.

---

### 5. Eliminar Usuario
**DELETE** `/usuario/eliminar/:id`

- **Descripción**: Elimina un usuario de forma lógica marcándolo como inhabilitado, requiere token de autenticación y permisos especificos.
- **Respuesta**:
    - `200 OK`: Usuario eliminado exitosamente.
    - `400 Bad Request`: Acceso no autorizado.

---

## Endpoints de Libros

### 1. Crear un Libro
**POST** `/crear`

- **Descripción**: Agrega un nuevo libro al sistema, requiere token de autenticación y permisos especificos.
- **Cuerpo de la Solicitud**:
    ```json
    {
        "titulo": "string",
        "autor": "string",
        "editorial": "string",
        "fechaPublicacion": "YYYY-MM-DD",
        "genero": "string",
        "cantidad": "number"
    }
    ```
- **Respuesta**:
    - `201 Created`: Libro creado exitosamente.
    - `400 Bad Request`: Datos faltantes o inválidos.

---

### 2. Buscar Libros por Filtros
**GET** `/buscar/filtros`

- **Descripción**: Recupera libros basados en parámetros de consulta.
- **Parámetros de Consulta**:
    - `titulo`, `autor`, `editorial`, `fechaPublicacion`, `genero`, `disponible`, `inabilitado`
- **Respuesta**:
    - `200 OK`: Lista de libros que coinciden con los filtros.
    - `400 Bad Request`: Filtros inválidos.

---

### 3. Obtener Libro por ID
**GET** `/buscar/:id`

- **Descripción**: Recupera un libro por su ID.
- **Respuesta**:
    - `200 OK`: Detalles del libro.
    - `400 Bad Request`: Libro no encontrado.

---

### 4. Actualizar Libro
**PATCH** `/actualizar`

- **Descripción**: Actualiza la información de un libro, requiere token de autenticación y permisos especificos.
- **Cuerpo de la Solicitud**:
    ```json
    {
        "id": "string",
        "titulo": "string",
        "autor": "string",
        "editorial": "string",
        "fechaPublicacion": "YYYY-MM-DD",
        "genero": "string",
        "cantidad": "number",
        "inabilitado": "boolean"
    }
    ```
    Nota: No es obligatoria actualizar todos los campos, solo los que se desean modificar.
- **Respuesta**:
    - `200 OK`: Libro actualizado exitosamente.
    - `400 Bad Request`: Datos faltantes o inválidos.

---

### 5. Eliminar Libro
**DELETE** `/eliminar/:id`

- **Descripción**: Elimina un libro de forma lógica marcándolo como inhabilitado, requiere token de autenticación y permisos especificos.
- **Respuesta**:
    - `200 OK`: Libro eliminado exitosamente.
    - `400 Bad Request`: Acceso no autorizado.

---

## Endpoints de Reservas

### 1. Crear una Reserva
**POST** `/crear`

- **Descripción**: Crea una reserva para un libro, requiere token de autenticación.
- **Cuerpo de la Solicitud**:
    ```json
    {
        "idLibro": "string",
        "fechaEntrega": "YYYY-MM-DD"
    }
    ```
- **Respuesta**:
    - `201 Created`: Reserva creada exitosamente.
    - `400 Bad Request`: Datos faltantes o inválidos.

---

### 2. Obtener Reservas por Usuario
**GET** `/leer/usuario/:idUsuario`

- **Descripción**: Recupera las reservas de un usuario específico, requiere token de autenticación y permisos especificos.
- **Respuesta**:
    - `200 OK`: Lista de reservas.
    - `400 Bad Request`: Acceso no autorizado.

---

### 3. Obtener Reservas por Libro
**GET** `/leer/libros/:libro`

- **Descripción**: Recupera las reservas de un libro específico, requiere token de autenticación y permisos especificos.
- **Respuesta**:
    - `200 OK`: Lista de reservas.
    - `400 Bad Request`: Acceso no autorizado.

---

## Esquemas

### Esquema de Usuario
```json
{
    "nombre": "string",
    "correo": "string",
    "clave": "string",
    "rol": ["string"],
    "inabilitado": "boolean"
}
```

### Esquema de Libro
```json
{
    "titulo": "string",
    "autor": "string",
    "editorial": "string",
    "fechaPublicacion": "string",
    "genero": "string",
    "cantidad": "number",
    "disponible": "number",
    "inabilitado": "boolean"
}
```

### Esquema de Reserva
```json
{
    "idUsuario": "string",
    "libro": "string",
    "fechaReserva": "string",
    "fechaEntrega": "string",
    "inabilitado": "boolean"
}
```

---

## Notas

- **Autenticación**: La mayoría de los endpoints requieren un token válido para acceder.
- **Roles**: Se requieren roles específicos para ciertas acciones (por ejemplo, administrador, crear-libro, eliminar-usuario).
- **Manejo de Errores**: Asegúrese de validar correctamente los datos de entrada para evitar errores.

---
