import express from 'express'

/** Inicializacion de express */
const app = express();

/* Routers */


/** Levanto el servidor para que escuche en el puerto 8080 */
app.listen(8080, () => console.log('Server Up!'));
