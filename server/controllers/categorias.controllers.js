import { pool } from "../db.js";

export const getCategorias = async(req, res) =>{
    try{
     const [categorias] = await pool.query('select * from Categoria');
     res.status(200).json(categorias);
    }catch(e){
     res.status(500).json(e);
    }
};  

export const getCategoria = async(req, res) => {
    try {
        const ID = req.params.id;
        const [categoria]= await pool.query('select * from Categoria where ID=?',[ID]);
        
        if (categoria.length === 0 ) 
            res.status(404).json({ message:"categoria no encontrada"});
        
        res.status(200).json(categoria[0]);
    } catch (e) {
        res.status(500).json(e);
    }
};    

export const createCategoria = async (req,res) =>{
    try {
        const {Nombre, Stock, Stock_Max, Stock_Min} = req.body;
        const [categoria] =await pool.query("INSERT INTO Categoria(Nombre, Stock, Stock_Max, Stock_Min) VALUES (?, ?, ?, ?)",[Nombre, Stock, Stock_Max, Stock_Min]);
    
        res.status(200).json({
            id:categoria.insertId,
            Nombre,
            Stock,
            Stock_Max,
            Stock_Min,
        });
    }catch (error) {
        res.status(500).json({message:"error al crear la categoria"});
    }
};   

export const deleteCategoria = async(req,res) => {
    try {
        const ID = req.params.id;
        const [categoria] = await pool.query("DELETE FROM Categoria WHERE id = ? ", [ID]);
        
        if (categoria.affectedRows === 0)
        return  res.status(404).json({ message:"categoria no encontrada" });

        res.status(200).json({msg:'categoria eliminado con exito'});
    } catch (e) {
        res.status(500).json(e);
    }
};

export const updateCategoria = async(req,res) =>{
   try {
        const ID = req.params.id;
        const [categoria] = await pool.query("UPDATE categoria SET ? WHERE ID =?",[req.body,ID]);

        if (categoria.affectedRows === 0)
        return  res.status(404).json({ message:"categoria no encontrada" });

        res.status(200).json({msg:'actualizado con exito'});
   } catch (e) {
        res.status(500).json(e);
   }
};