import { pool } from "../../db.js";
import bcrypt from 'bcrypt';

export const registro = async (req, res) => {
    const { Codigo, Nombre, Apellido, Email, Contracena, Telefono, Id_Rol } = req.body;

    try {
        const [existingUser] = await pool.query(
            "SELECT * FROM Usuario WHERE Email = ?",
            [Email]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({ mensaje: 'El correo electrónico ya está registrado' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error al verificar el correo electrónico');
    }

    const hashedPassword = await bcrypt.hash(Contracena, 10);

    try {
            await pool.query(
            "INSERT INTO Usuario (Codigo, Nombre, Apellido, Email, Contracena, Telefono, Id_Rol) VALUES (?,?,?,?,?,?,?)",
            [Codigo, Nombre, Apellido, Email, hashedPassword, Telefono, Id_Rol]
        );

        const puntos = 0;

        const [rol] = await pool.query('select * from Rol where Rol.ID=?',[Id_Rol]);
        if(rol[0].Nombre == 'usuario'){
            try{
                await pool.query('insert into Cliente (Codigo,puntos) values (?,?)',[Codigo,puntos]);
            }catch(e){
                res.status(500).json({msg:'error al crear el cliente'});
            }
        }

        res.status(201).json({ mensaje: 'Registro exitoso' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Registro fallido');
    }
};


export const login = async (req, res) => {
    const { Email, Contracena } = req.body;


    try {
        const [user] = await pool.query(
            "SELECT * FROM Usuario WHERE Email = ?",
            [Email]
        );

        if (user.length === 0) {
            return res.status(400).json({ mensaje: 'Correo o Contracena invalida' });
        }

 
        const passwordMatch = await bcrypt.compare(Contracena, user[0].Contracena);
        if (!passwordMatch) {
            return res.status(400).json({ mensaje: 'Correo o Contracena invalida' });
        }
        
            
        res.status(200).json(user);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
};



export const getUsers =async(req, res) => {
    try{
        const [usuarios] = await pool.query('select * from Usuario');
        res.json(usuarios);
    }catch(error){
        console.log(error);
    }
}

export const getUser = async(req, res) => {
    try{
        const ID = req.params.id;
        const [user] = await pool.query('SELECT * FROM Usuario WHERE Codigo = ?', [ID]);
        res.json(user);
    }catch(e){
        res.status(500).json({e});
    }
}

export const deleteUser = async(req, res) => {
   try{
    const ID = req.params.id;
    await pool.query('delete from Usuario where Codigo=?',[ID]);
   }catch(e){
      res.status(500).json({e});
   }

}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { Nombre, Apellido, Email, Contracena, Telefono, Id_Rol } = req.body;

    try {
   
        const [existingUser] = await pool.query('SELECT * FROM Usuario WHERE Codigo = ?', [id]);
        if (existingUser.length === 0) {
            return res.status(404).json({ mensaje: 'El usuario no existe' });
        }

      
        let updateFields = [];
        let updateValues = [];

        if (Nombre) {
            updateFields.push('Nombre = ?');
            updateValues.push(Nombre);
        }
        if (Apellido) {
            updateFields.push('Apellido = ?');
            updateValues.push(Apellido);
        }
        if (Email) {
            updateFields.push('Email = ?');
            updateValues.push(Email);
        }
        if (Contracena) {
            const hashedPassword = await bcrypt.hash(Contracena, 10);
            updateFields.push('Contracena = ?');
            updateValues.push(hashedPassword);
        }
        if (Telefono) {
            updateFields.push('Telefono = ?');
            updateValues.push(Telefono);
        }
        if (Id_Rol) {
            updateFields.push('Id_Rol = ?');
            updateValues.push(Id_Rol);
        }

        if (updateFields.length === 0) {
            return res.status(400).json({ mensaje: 'No se proporcionaron campos para actualizar' });
        }


        updateValues.push(id);
        const updateQuery = `UPDATE Usuario SET ${updateFields.join(', ')} WHERE Codigo = ?`;
        await pool.query(updateQuery, updateValues);

        res.status(200).json({ mensaje: 'Usuario actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el usuario');
    }
};

