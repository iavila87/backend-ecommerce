import express from 'express'

/** Inicializacion de express */
const app = express();

/* Routes */


/** Levanto el servidor para que escuche en el puerto 8080 */
app.listen(8080, () => console.log('Server Up!'));
