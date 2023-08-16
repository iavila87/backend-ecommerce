import { Router } from "express";
import CartManager from '../CartManager.js'
import ProductManager from '../ProductManager.js'

/** Inicializacion de ProductManager */
const pm = new ProductManager('./data/products.json');
/** Inicializacion de CartManager */
const cm = new CartManager('./data/carts.json');

const router = Router();

/** Metodos POST */
/** post 'api/carts/' */
router.post('/', async (req, res) => {
    const newCart = await cm.createCart();
    
    if(typeof newCart == 'string'){
        // ver que error enviar
        return res.status(404).send( { status: "error", error: newCart.split(' ').slice(2).join(' ') } );
    }
    res.status(201).send( { status: "success", payload: newCart } );
});

/** post 'api/carts/:cid/product/:pid' */
router.post('/:cid/product/:pid', async (req, res) => {
    
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    
    const addProduct = await cm.addProductCartById(cid, pid);

    if(typeof addProduct == 'string'){
        // ver que error enviar
        return res.status(404).send( { status: "error", error: addProduct.split(' ').slice(2).join(' ') } );
    }

    res.status(201).send( { status: "success", payload: addProduct } );
});


/** Metodo GET*/
/** get 'api/carts/:cid' */
router.get('/:cid', async (req, res) =>{

    const id = parseInt(req.params.cid);
    const cart = await pm.getCartById(id);

    if(typeof cart == 'string'){
        return res.status(404).send( { status: "error", error: cart.split(' ').slice(2).join(' ') } );
    }
    res.status(200).send( { status: "success", payload: cart } );
});

export default router;