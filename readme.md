# Pokeserver

Bienvenido a Pokeserver! Este proyecto es una API para gestionar información sobre Pokémon. Utiliza Node.js, Express y MongoDB.

## Tabla de Contenidos

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Ejecución de la Aplicación](#ejecución-de-la-aplicación)
- [Patrones de Diseño y Arquitectura](#patrones-de-diseño-y-arquitectura)
- [Organización del Código](#organización-del-código)
- [Pruebas](#pruebas)
- [Pre-commit Hook](#pre-commit-hook)
- [Documentación de la API](#documentación-de-la-api)
- [Servidor en Producción](#servidor-en-producción)
- [Colección de Postman](#colección-de-postman)
- [Configuración de Variables de Entorno](#configuración-de-variables-de-entorno)

## Requisitos

- Node.js (v18 o superior)
- Docker y Docker Compose
- MongoDB

## Instalación

1. Clonar el repositorio:

    ```sh
    git clone https://github.com/moydany/pokeserver.git
    cd pokeserver
    ```

2. Instalar las dependencias:

    ```sh
    npm install
    ```

## Ejecución de la Aplicación

La aplicación se puede ejecutar localmente o utilizando Docker.

### Localmente

1. Asegurarse de tener MongoDB corriendo en `localhost:27017`.
2. Ejecutar la aplicación:

    ```sh
    npm run dev
    ```

### Usando Docker

1. Construir y levantar los contenedores Docker:

    ```sh
    docker-compose up --build
    ```

La aplicación estará disponible en `http://localhost:8080`.

### Usando Docker para Producción

1. Construir y levantar los contenedores Docker para producción:

    ```sh
    docker-compose -f docker-compose.prod.yml up --build
    ```

La aplicación estará disponible en `http://localhost:8080`.

## Patrones de Diseño y Arquitectura

### Patrones de Diseño

- **Inyección de Dependencias (DI)**: `inversify` se utiliza para manejar la inyección de dependencias, lo que facilita la modularidad y las pruebas.
- **Singleton**: Implementado en el patrón de caché para asegurar una única instancia de la caché en toda la aplicación.
- **Repository**: Separación de la lógica de acceso a datos de la lógica de negocio para facilitar el mantenimiento y las pruebas.

### Arquitectura

- **Capas**: La aplicación está estructurada en capas claras (Controladores, Servicios, Repositorios, Modelos), siguiendo el principio de responsabilidad única.
- **Configuración centralizada**: La configuración de la base de datos y otros componentes clave están centralizados.

## Organización del Código

- **src/config**: Configuración de la base de datos y logger.
- **src/controllers**: Controladores que manejan las solicitudes HTTP.
- **src/middleware**: Middleware de autenticación.
- **src/models**: Modelos de Mongoose para MongoDB.
- **src/repositories**: Repositorios para el acceso a datos.
- **src/routes**: Definición de rutas de la API.
- **src/services**: Servicios que contienen la lógica de negocio.
- **src/tests**: Pruebas unitarias para los servicios.

## Pruebas

Las pruebas están escritas con Jest. Para ejecutarlas, simplemente correr:

    ```sh
    npm test
    ```

## Pre-commit Hook

Husky y lint-staged se utilizan para asegurar la calidad del código antes de cada commit. El pre-commit hook formatea el código y ejecuta las pruebas:

### Configuración de Husky

    ```sh
    npx husky install
    npx husky add .husky/pre-commit "npx lint-staged"
    ```

El archivo `.husky/pre-commit` debería contener:

    ```sh
    #!/bin/sh
    . "$(dirname "$0")/_/husky.sh"

    npx lint-staged
    ```

El archivo `package.json` contiene la configuración de `lint-staged`:

    ```json
    "lint-staged": {
      "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}": [
        "prettier --write",
        "jest --bail --findRelatedTests",
        "git add"
      ]
    }
    ```

## Documentación de la API

La documentación de la API está disponible en Swagger. Para acceder a ella, navegar a `http://localhost:8080/api-docs` después de levantar la aplicación.

## Servidor en Producción

El servidor en producción está disponible en la siguiente URL:

[https://pokeserver.orbitm.dev/](https://pokeserver.orbitm.dev/)

## Colección de Postman

Puedes utilizar una colección de Postman para probar la API. Sigue estas instrucciones:

1. **Importar la Colección:**
   - Abre Postman.
   - Haz clic en el botón "Import" y selecciona el archivo `.json` de la colección.

2. **Configurar Variables de Entorno:**
   - Haz clic en la pestaña "Environments".
   - Crea un nuevo entorno llamado "Pokeserver".
   - Agrega las siguientes variables:
     - `base_url`: `http://localhost:8080`
     - `token`: Déjalo en blanco inicialmente.

3. **Ejecutar las Solicitudes:**
   - Utiliza la solicitud "Sign Up User" para crear un nuevo usuario.
   - Utiliza la solicitud "Login User" para iniciar sesión con las credenciales del usuario creado. Esta solicitud configurará automáticamente la variable `token` para las solicitudes posteriores.
   - Utiliza las demás solicitudes para interactuar con la API, como obtener, guardar y eliminar Pokémon.

4. **Ejecutar Pruebas:**
   - Cada solicitud tiene scripts de prueba para validar la respuesta. Consulta la pestaña "Tests" de cada solicitud para más detalles.

## Configuración de Variables de Entorno

Para configurar la conexión a la base de datos remota de MongoDB en producción, necesitas crear un archivo `.env` en el directorio raíz del proyecto. Puedes utilizar el archivo de muestra `.env.sample` como referencia:

### Archivo `.env.sample`

### Instrucciones:

1. Copia el archivo `.env.sample` y renómbralo a `.env`.
2. Rellena los valores de `<user>`, `<password>`, y `<host>` con tus credenciales de MongoDB y la dirección del host.
3. Guarda el archivo `.env` en el directorio raíz del proyecto.

La aplicación utilizará esta configuración para conectarse a la base de datos MongoDB en el entorno de producción.

## Ver los Logs de Winston

La aplicación utiliza Winston para la gestión de logs. Los logs se almacenan en archivos dentro del directorio `logs`.

### Archivos de Log

- `logs/combined.log`: Contiene todos los logs generados por la aplicación.
- `logs/error.log`: Contiene únicamente los logs de errores.

### Ver los Logs

Para ver los logs, puedes abrir los archivos directamente o utilizar comandos de la terminal para ver su contenido:

- Para ver el contenido completo del archivo de logs combinado:

    ```sh
    cat logs/combined.log
    ```

- Para ver el contenido completo del archivo de logs de errores:

    ```sh
    cat logs/error.log
    ```

- Para seguir los logs en tiempo real (combinado):

    ```sh
    tail -f logs/combined.log
    ```

- Para seguir los logs en tiempo real (errores):

    ```sh
    tail -f logs/error.log
    ```
