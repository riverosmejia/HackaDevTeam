# HackaDevTeam Project

Este proyecto es una aplicación web que combina un **frontend** desarrollado en React con un **backend** construido en Node.js utilizando Express. Además, incluye un contrato inteligente en Solidity desplegado en una subred de Avalanche para registrar y asegurar la información de productos, garantizando su autenticidad y origen.

## Objetivo del Proyecto

El objetivo principal es registrar productos y almacenar su información en una subred de Avalanche mediante un contrato inteligente. Esto asegura que los datos del producto, como su lugar de creación, sean inmutables y verificables, proporcionando confianza y transparencia en la cadena de suministro.

## Tecnologías Utilizadas

### Frontend
- **React**: Biblioteca para construir interfaces de usuario.
- **html5-qrcode**: Librería para escanear códigos QR y códigos de barras.
- **CSS**: Para el diseño y estilos de la aplicación.
- **React Testing Library**: Para pruebas unitarias en el frontend.

### Backend
- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework para construir APIs RESTful.
- **QRCode**: Librería para generar códigos QR.
- **TypeScript**: Lenguaje de programación tipado que compila a JavaScript.

### Blockchain
- **Solidity**: Lenguaje de programación para contratos inteligentes.
- **Avalanche**: Plataforma blockchain utilizada para desplegar el contrato inteligente en una subred personalizada.
- **Web3.js**: Librería para interactuar con la blockchain desde el backend.

### Herramientas de Desarrollo
- **ts-node-dev**: Herramienta para ejecutar y recargar automáticamente el servidor durante el desarrollo.
- **TypeScript**: Para un desarrollo más robusto y con tipado estático.
- **Jest**: Para pruebas unitarias en el frontend.
- **Visual Studio Code**: IDE recomendado para trabajar con este proyecto.

## Arquitectura del Proyecto

### Estructura del Backend
```
back/
├── package.json
├── tsconfig.json
└── src/
    ├── server.ts
    ├── controllers/
    │   └── product.controller.ts
    ├── routes/
    │   └── product.route.ts
    ├── services/
    │   └── product.service.ts
    └── blockchain/
        └── avalanche.service.ts
```

- **`server.ts`**: Configuración principal del servidor Express.
- **`controllers/`**: Contiene la lógica de controladores para manejar las solicitudes HTTP.
- **`routes/`**: Define las rutas de la API.
- **`services/`**: Contiene la lógica de negocio, como la creación y obtención de productos.
- **`blockchain/`**: Contiene la lógica para interactuar con el contrato inteligente en Avalanche.

### Estructura del Frontend
```
front/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
└── src/
    ├── App.jsx
    ├── Html5QrcodePlugin.jsx
    ├── ResultContainerPlugin.jsx
    ├── HowToUse.jsx
    ├── index.js
    ├── App.css
    └── tests/
        └── App.test.js
```

- **`App.jsx`**: Componente principal que integra los plugins de escaneo y visualización de resultados.
- **`Html5QrcodePlugin.jsx`**: Plugin para escanear códigos QR.
- **`ResultContainerPlugin.jsx`**: Componente para mostrar los resultados escaneados.
- **`HowToUse.jsx`**: Sección informativa sobre cómo usar la aplicación.

### Contrato Inteligente
```
contracts/
└── origen-contract.sol
```

- **`origen-contract.sol`**: Contrato inteligente que almacena información de productos, incluyendo nombre, categoría, descripción y ubicación.

#### Funciones del Contrato Inteligente
1. **`storeData`**: Permite registrar la información de un producto (nombre, categoría, descripción y ubicación) y devuelve un ID único.
2. **`getData`**: Recupera la información de un producto almacenado utilizando su ID.

## Funcionalidades

### Backend
1. **Registro de Productos**: Permite registrar productos con nombre, tipo, descripción y ubicación. Genera un código QR con esta información.
2. **Consulta de Productos**: Devuelve una lista de todos los productos registrados.
3. **Interacción con Blockchain**: Registra la información del producto en la subred de Avalanche utilizando el contrato inteligente.

### Frontend
1. **Escaneo de Códigos QR**: Utiliza la cámara del dispositivo para escanear códigos QR.
2. **Visualización de Resultados**: Muestra los resultados escaneados en una tabla.
3. **Interfaz Intuitiva**: Diseño responsivo y fácil de usar.

### Contrato Inteligente
1. **Registro de Información**: Almacena datos del producto en la blockchain, incluyendo nombre, categoría, descripción y ubicación.
2. **Consulta de Información**: Permite recuperar la información almacenada utilizando el ID del producto.

## Cómo Ejecutar el Proyecto

### Backend
1. Instalar dependencias:
   ```bash
   cd back
   npm install
   ```
2. Iniciar el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

### Frontend
1. Instalar dependencias:
   ```bash
   cd front
   npm install
   ```
2. Iniciar la aplicación:
   ```bash
   npm start
   ```

### Contrato Inteligente
1. Desplegar el contrato en una subred de Avalanche utilizando herramientas como Remix.
2. Configurar la dirección del contrato en el archivo de configuración del backend.

## Próximos Pasos
- Integrar una base de datos para persistir los productos.
- Mejorar la interfaz de usuario con más funcionalidades.
- Agregar autenticación para proteger las rutas del backend.

## Créditos
Este proyecto fue desarrollado por:
- Miguel Angel Riveros
- Lorenzo Baena
- Camilo Echeverri Castrillon
- Juan Jose Zapata