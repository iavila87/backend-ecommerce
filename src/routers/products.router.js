import { Router } from "express";
import ProductManager from '../dao/ProductManager.js'
import productsModel from "../dao/models/products.model.js" 

/** Inicializacion de ProductManager */
const pm = new ProductManager('./data/products.json');

const router = Router();

/** Metodos GET */
/** get 'api/products' y 'api/products?limit='*/
router.get('/', async (req, res) =>{

    /* const limit contiene el valor del queryparam(limit)
    en caso de que este no exista por defecto se le asigna 10 */
    const limit = req.query.limit || 10;
    /* const page contiene el valor del queryparam(page)
    en caso de que este no exista por defecto se le asigna 1 */
    const page = req.query.page || 1;
    const filters = {};
    if(req.query.category)  filters.category = req.query.category;
    if(req.query.stock)     filters.stock = req.query.stock;
    
    /** paginacion */
    
    /* *********** */

    /** Acceso por archivo
        const products = await pm.getProducts();
    */
    /** Acceso por Mongoose */
    try{
        const products = await productsModel.find().limit(limit);
        return res.status(200).send( { 
            status:'success',
            payload: products,
            totalPages: 1,
            prevPage: null,
            nextPage: null,
            page: 1,
            hasPrevPage: false,
            hasNextPage: false,
            prevLink: null,
            nextLink: null
        });
    }
    catch(error){
        console.log("error: " + error);
        return res.status(404).send( {
            status: "error",
            error: error.message,
            totalPages: 1,
            prevPage: null,
            nextPage: null,
            page: 1,
            hasPrevPage: false,
            hasNextPage: false,
            prevLink: null,
            nextLink: null 
        });
    }
});

/** get 'api/products/:pid' */
router.get('/:pid', async (req, res) =>{

    const id = req.params.pid;
    /** por filesystem */
    //const product = await pm.getProductById(id);
    try{
        /** por mongoose */
        const product = await productsModel.find({_id:id});
        return res.status(200).send( { status: "success", payload: product } );
    }catch(error){
        console.log("error: "+ error )
        res.status(404).send( { status: "error", error: error.message } );
    }
});

/** Metodo POST */
router.post('/', async (req, res) => {
    /** por archivo */
    //const newProduct = await pm.addProduct(req.body);
    /** por mongoose */
    try{
        const newProduct = req.body;
        newProduct.status = true;
        const generatedProduct = new productsModel(newProduct);
        await generatedProduct.save();
        // res.redirect('/'); redirecciona a la vista raiz
        res.status(201).send( { status: "success", payload: generatedProduct } );
    }catch(error){
        console.log("error: " + error);
        return res.status(404).send( { status: "error", error: error.message } );
    }
});

/** Metodo PUT */
router.put('/:pid', async (req, res) =>{

    const id = req.params.pid;
    const updateProduct = req.body;
    /** por archivo */
    //const product = await pm.updateProduct(id, req.body);
    /** por mongoose */
    try{
        const product = await productsModel.updateOne({_id:id}, updateProduct);
        res.status(200).send( { status: "success", payload: product } );
    }catch(error){
        console.log("error: "+error);
        return res.status(404).send( { status: "error", error: error.message } );
    }
});

/** Metodo DELETE */
router.delete('/:pid', async (req, res) =>{

    const id = req.params.pid;
    /** por archivo */
    //const products = await pm.deleteProduct(id);
    /** por mongoose */
    try{
        await productsModel.deleteOne({_id:id});
        const products = productsModel.find();

        res.status(200).send( { status: "success", payload: products } );
    }catch(error){
        console.log("error: "+error);
        return res.status(404).send( { status: "error", error: error.message } );
    }
});

export default router;