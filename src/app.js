import express from 'express'
import productRouter  from './routers/products.router.js'

/** Inicializacion de express */
const app = express();
/** */
app.use(express.json());

/* Routers */
app.use('/api/products', productRouter);

/** Levanto el servidor para que escuche en el puerto 8080 */
app.listen(8080, () => console.log('Server Up!'));
