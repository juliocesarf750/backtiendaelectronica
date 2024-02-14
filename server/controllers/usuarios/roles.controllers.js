import { pool } from "../../db.js";


export const getRoles = async(req, res) =>{
   try{
    const [roles] = await pool.query('select * from Rol');
    res.status(200).json(roles);
   }catch(e){
    res.status(500).json(e);
   }
}

export const getRol = async(req, res) => {
  const ID = req.params.id;
  const [rol]= await pool.query('select * from Rol where ID=?',[ID]);
  res.status(200).json(rol);
}

export const createRol = async (req, res) => {
    const { Nombre, Descripcion } = req.body;

    try {
 
        const [result] = await pool.query('INSERT INTO Rol (Nombre, Descripcion) VALUES (?, ?)', [Nombre, Descripcion]);

    
        const newRoleId = result.insertId;

     
        if (!newRoleId) {
            return res.status(500).json({ mensaje: 'Error al obtener el ID del nuevo rol' });
        }

        
        const newRol = {
            ID: newRoleId,
            Nombre: Nombre,
            Descripcion: Descripcion
        };

       
        res.status(201).json(newRol);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear el rol');
    }
};


export const deleteRol = async(req, res) => {
   try{
    const ID = req.params.id;
    await pool.query('delete from Rol where ID=?',[ID]);
    res.status(200).json({msg:'Rol eliminado con exito'});
   }catch(e){
    res.status(500).json({msg:e});
   }
}

export const updateRol = async (req, res) => {
    const { id } = req.params;
    const { Nombre, Descripcion } = req.body;

    try {
       
        const [existingRol] = await pool.query('SELECT * FROM Rol WHERE ID = ?', [id]);
        if (existingRol.length === 0) {
            return res.status(404).json({ mensaje: 'El rol no existe' });
        }

     
        let updateFields = [];
        let updateValues = [];

        if (Nombre) {
            updateFields.push('Nombre = ?');
            updateValues.push(Nombre);
        }
        if (Descripcion) {
            updateFields.push('Descripcion = ?');
            updateValues.push(Descripcion);
        }

        if (updateFields.length === 0) {
            return res.status(400).json({ mensaje: 'No se proporcionaron campos para actualizar' });
        }

  
        updateValues.push(id);
        const updateQuery = `UPDATE Rol SET ${updateFields.join(', ')} WHERE ID = ?`;
        await pool.query(updateQuery, updateValues);

        res.status(200).json({ mensaje: 'Rol actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el rol');
    }
};
