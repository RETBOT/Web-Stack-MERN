# Web-Stack-MERN

## Url página web en funcionamiento
https://64556ff28f69eb12074888ff--retbot.netlify.app/

## Tecnologías

- MongoDB <br>
- Express <br>
- React <br>
- Node.js

<img src="https://github.com/RETBOT/RETBOT/blob/main/Imgs/MERN.png" alt="img" width="300" height="200">

## Descripción

Este es mi primer proyecto desarrollado con el stack MERN (MongoDB, Express, React y Node.js). <br>
La página web es una API REST conectada a MongoDB utilizando el ODM Mongoose. <br>
El frontend fue desarrollado utilizando SASS, React Router Dom y sistemas de layouts.<br>
La aplicación cuenta con un sistema de autenticación protegido con JWT y Access Tokens para permitir el acceso a usuarios registrados, y Refresh Tokens para recuperar sesiones. <br>
Los usuarios con privilegios tienen acceso a un panel de administrador para gestionar la web, incluyendo un menú completamente dinámico que se puede gestionar desde el panel.<br>
La aplicación también cuenta con un sistema de Newsletter y una sección para subir cursos conectada a la API de Afiliados Udemy. <br>
Además, tiene un sistema de Blog con paginación y creación de URL dinámicas que también se puede gestionar desde el panel de Administrador.<br>
Se ha implementado SEO On Page para mejorar la visibilidad en Google. La aplicación se aloja en servidores en la nube.<br>

## Instalación

1. Clonar el repositorio
2. Modificar las consants.js con sus crenciales
3. Instalar <a href="https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable">yarn</a>

```
npm install --global yarn
```

4. Instalar las dependencias con `yarn install`
5. Iniciar el servidor dese la carpeta server con `yarn dev`
6. Iniciar la aplicación web desde la carpea retbot con `yarn start`
