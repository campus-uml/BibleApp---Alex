

# BibleApp

BibleApp es una aplicación web para explorar la Biblia utilizando la API de [API.BIBLE](https://scripture.api.bible/livedocs). El proyecto está construido con React, Vite, TypeScript, Tailwind CSS, ShadCN.

Puedes ver la aplicación en producción en el siguiente enlace:

[Acceder a BibleApp en Render](https://bibleapp-alex.onrender.com/)

## Tecnologías utilizadas

- **React**: Librería para la construcción de interfaces de usuario.
- **Vite**: Herramienta de construcción rápida para proyectos de frontend.
- **TypeScript**: Superset de JavaScript que agrega tipado estático.
- **Tailwind CSS**: Framework de diseño de CSS para crear interfaces personalizadas.
- **ShadCN**: Conjunto de componentes UI listos para usar con Tailwind CSS.
- **Axios**: Cliente HTTP para realizar solicitudes a la API.
- **API.BIBLE**: API que proporciona acceso a versiones y datos de la Biblia.

## Requisitos

Antes de comenzar, asegúrate de tener las siguientes herramientas instaladas en tu máquina:

- **Node.js** (v14 o superior)
- **Yarn** (gestor de dependencias)

## Instalación

1. Clona el repositorio en tu máquina local:

   ```bash
   git clone https://github.com/campus-uml/BibleApp---Alex/tree/main

2. Accede a la carpeta del proyecto:

cd bibleapp


3. Instala las dependencias usando Yarn:

yarn install


4. Crea un archivo .env en la raíz del proyecto con las siguientes variables de entorno:

VITE_API_URL=https://api.scripture.api.bible/v1

VITE_API_KEY=<tu-api-key>

Asegúrate de reemplazar <url-de-la-api> y <tu-api-key> con los valores correctos proporcionados por la API de API.BIBLE.



Ejecución del proyecto

Para ejecutar el proyecto en modo de desarrollo:

yarn dev

Esto iniciará el servidor en http://localhost:5173.

Construcción para Producción

Para crear una versión optimizada del proyecto para producción:

yarn build

Esto generará los archivos de producción en la carpeta dist.

:)



