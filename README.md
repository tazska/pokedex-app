# Catálogo Pokédex

Aplicación web desarrollada con React y Vite que consume la [PokéAPI](https://pokeapi.co/) para mostrar un catálogo de Pokémon. La aplicación carga la información de forma asíncrona, muestra estados de carga y error, y permite filtrar los Pokémon por nombre de manera local.

## Tecnologías

- **Node.js LTS** y **npm** como entorno de ejecución y gestor de paquetes.
- **Vite** con la plantilla de React en JavaScript.
- **React** para la construcción de la interfaz mediante componentes y hooks.
- **Axios** para realizar las peticiones HTTP a PokéAPI.
- **PokéAPI** como fuente de datos de los Pokémon.
- Estilos en línea (sin frameworks de CSS).

## Estructura del proyecto

```
pokedex-app/
├── public/
│   ├── _redirects          # Regla de redirección para Netlify
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── PokemonCard.jsx # Tarjeta con el detalle de cada Pokémon
│   ├── services/
│   │   └── pokemonService.js # Funciones de acceso a PokéAPI con Axios
│   ├── App.jsx             # Vista principal y filtro por nombre
│   ├── index.css           # Estilos base mínimos
│   └── main.jsx            # Punto de entrada de React
├── .env.example            # Ejemplo de variables de entorno
├── index.html
├── package.json
└── vite.config.js
```

## Ejecutar en local

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Crea el archivo `.env` a partir del ejemplo:

   ```bash
   cp .env.example .env
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abre en el navegador la URL que muestra Vite (por defecto `http://localhost:5173`).

## Variables de entorno

El proyecto utiliza la variable `VITE_POKEAPI_URL`, que debe contener la URL base de PokéAPI. Vite expone las variables con el prefijo `VITE_` al código del cliente.

```env
VITE_POKEAPI_URL=https://pokeapi.co/api/v2
```

Copia `.env.example` a `.env` para trabajar en local. El archivo `.env` está excluido de Git.

## Compilar para producción

```bash
npm run build
```

El comando genera la carpeta `dist/` con los archivos optimizados listos para desplegar. Para revisar el resultado localmente:

```bash
npm run preview
```

## Despliegue en Vercel

1. Importa el repositorio desde el panel de Vercel.
2. En la configuración del proyecto, añade la variable de entorno `VITE_POKEAPI_URL` con el valor `https://pokeapi.co/api/v2`.
3. Pulsa **Deploy**. Vercel detecta Vite y usa `npm run build` con la carpeta de salida `dist`.

## Despliegue en Netlify

1. Importa el repositorio desde el panel de Netlify.
2. Configura el comando de build como `npm run build`.
3. Configura el directorio de publicación como `dist`.
4. Añade la variable de entorno `VITE_POKEAPI_URL` con el valor `https://pokeapi.co/api/v2`.
5. Pulsa **Deploy site**.

El archivo `public/_redirects` incluye la regla `/* /index.html 200`, necesaria para que las rutas del cliente funcionen correctamente en Netlify.

## Scripts disponibles

- `npm run dev`: inicia el servidor de desarrollo de Vite.
- `npm run build`: genera la compilación de producción en `dist/`.
- `npm run preview`: sirve localmente la compilación de producción.
- `npm run lint`: analiza el código con la herramienta de lint configurada por Vite.
