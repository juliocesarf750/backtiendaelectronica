import { Router } from "express";
import { deleteUser, getUser, getUsers, login, registro, updateUser } from "../../controllers/usuarios/usuarios.controllers.js";


const router = Router();

router.post('/registro',registro);
router.post('/login',login);
router.get('/users',getUsers);
router.get('/users/:id',getUser);
router.delete('/users/:id',deleteUser);
router.put('/users/:id',updateUser);

export default router;