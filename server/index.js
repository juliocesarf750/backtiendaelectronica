import express from 'express'
import { PORT } from './config.js';
import usuariosrouter from './routers/usuarios/usuarios.routes.js';
import rolesrouter from './routers/usuarios/roles.routes.js';


const app = express();
app.use(express.json());

app.use(usuariosrouter);
app.use(rolesrouter);
app.listen(PORT)
console.log(`the server is running on port ${PORT}`);