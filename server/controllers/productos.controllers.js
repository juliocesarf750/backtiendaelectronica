import {pool} from "../db.js"

export const getProductos = async (req, res)=> {
   try {
        const [productos] = await pool.query("SELECT* FROM Producto");
        res.json(productos);
   } catch (e) {
        res.status(500).json(e);
   }
};

export const getProducto = async(req, res)=> {
    try {
        const ID = req.params.id;
        const [producto] = await pool.query("SELECT* FROM Producto WHERE id =?", [ID]);
    
        if(producto.length === 0)
            res.status(404).json({ message:"producto no encontrado"}); 
        res.status(200).json(producto[0]);
    } catch (e) {
        res.status(500).json(e);
    }

};

export const createProducto = async (req,res) =>{
    try {
        const {Nombre, Descripcion, Stock, mostrar,Id_Categoria} = req.body;
        const [categoria] =await pool.query("INSERT INTO Producto(Nombre, Descripcion, Stock, mostrar,Id_Categoria) VALUES (?, ?, ?, ?, ?)",[Nombre, Descripcion, Stock, mostrar,Id_Categoria]);
    
        res.status(200).json({
            id:categoria.insertId,
            Nombre,
            Descripcion,
            Stock,
            mostrar,
            Id_Categoria
        });
    }catch (error) {
        res.status(500).json({message:"error al crear la categoria"});
    }
}; 

export const deleteProducto = async(req,res) => {
    try {
        const ID = req.params.id;
        const [producto] = await pool.query("DELETE FROM Producto WHERE id = ? ", [ID]);
        
        if (producto.affectedRows === 0)
        return  res.status(404).json({ message:"producto no encontrado" });

        res.status(200).json({msg:'producto eliminado con exito'});
    } catch (e) {
        res.status(500).json(e);
    }
};

export const updateProducto = async(req,res) =>{
    const {id} = req.params;
    const {Nombre, Descripcion, Stock, mostrar,Id_Categoria} = req.body;
   try {
        
        const [producto] = await pool.query("SELECT* FROM Producto WHERE ID =?",[id]);
        if (producto.length === 0) {
            return res.status(404).json({ mensaje: 'El producto no existe' });
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
        if (Stock) {
            updateFields.push('Stock = ?');
            updateValues.push(Stock);
        }
        if (mostrar) {
            updateFields.push('mostrar= ?');
            updateValues.push(mostrar);
        }
        if (Id_Categoria) {
            updateFields.push('Id_Categoria = ?');
            updateValues.push(Id_Categoria);
        }

        if (updateFields.length === 0) {
            return res.status(400).json({ mensaje: 'No se proporcionaron campos para actualizar' });
        }

        updateValues.push(id);
        const updateQuery = `UPDATE Producto SET ${updateFields.join(', ')} WHERE ID = ?`;
        await pool.query(updateQuery, updateValues);


        res.status(200).json({msg:'actualizado con exito'});
   } catch (e) {
        console.error(error);
        res.status(500).json(e);
   }
};