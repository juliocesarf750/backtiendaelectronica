import { Router } from "express";
import { createRol, deleteRol, getRol, getRoles, updateRol } from "../../controllers/usuarios/roles.controllers.js";



const router = Router();

router.get('/roles',getRoles);
router.get('/roles/:id',getRol);
router.post('/roles',createRol);
router.put('/roles/:id',updateRol);
router.delete('/roles/:id',deleteRol);

export default router;