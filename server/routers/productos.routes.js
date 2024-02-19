import {Router} from "express";
import  {createProducto, getProducto, getProductos, deleteProducto, updateProducto} from "../controllers/productos.controllers.js";

const router= Router();

router.get('/productos',getProductos);
router.get('/productos/:id',getProducto);
router.post('/productos',createProducto);
router.delete('/productos/:id',deleteProducto);
router.put('/productos/:id', updateProducto);

export default router;