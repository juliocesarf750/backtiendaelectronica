import {Router} from "express";
import {createCategoria, getCategoria, getCategorias, deleteCategoria,updateCategoria} from "../controllers/categorias.controllers.js";

const router = Router();

router.get('/categorias',getCategorias);
router.get('/categorias/:id',getCategoria);
router.post('/categorias',createCategoria);
router.delete('/categorias/:id',deleteCategoria);
router.put('/categorias/:id', updateCategoria);


export default router;