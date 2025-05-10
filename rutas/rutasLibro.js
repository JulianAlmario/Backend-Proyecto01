const libroController = require('../controladores/controladorLibro');
const express = require('express');
const validarToken=require('../Middleware/validarToken')
const router = express.Router();
const actualizarLibroAccion=require('../acciones/accionesLibros/actualizarLibro');

router.post('/crear', validarToken,async (req, res) => {
   
  const userinfo=req.user;

   try{
     const respuesta= await libroController.crearLibro(req,userinfo);
     if(respuesta.message){
         return res.status(400).json({ message: respuesta.message });
     }
     res.status(201).json({ message: 'Libro creado exitosamente', libro: respuesta });
   }catch(error){
      console.error('Error al crear el libro:', error);
       res.status(500).json({ error: 'Error al crear el libro' });
   }
   
});

router.get('/buscar/filtros', async (req, res) => {
   
  try{
    const respuesta= await libroController.leerLibrosFiltros(req);
    if(respuesta.message){
        return res.status(400).json({ message: respuesta.message });
    }
    res.status(201).json({ Libros:respuesta });
  }catch(error){
     console.error('Error al buscar los libros:', error);
      res.status(500).json({ error: 'Error al buscar los libros' });
  }
  
});

router.get('/buscar/:id', async (req, res) => {
   
   try{
     const respuesta= await libroController.leerLibrosId(req);
     if(respuesta.message){
         return res.status(400).json({ message: respuesta.message });
     }
     res.status(201).json({ Libro:respuesta });
   }catch(error){
      console.error('Error al buscar el libro:', error);
       res.status(500).json({ error: 'Error al buscar el libro' });
   }
   
});

router.patch('/actualizar', validarToken,async (req, res) => {
  const userinfo=req.user;
  try{
    const respuesta= await libroController.actualizarLibro(req,userinfo);
    if(respuesta.message){
        return res.status(400).json({ message: respuesta.message });
    }
    res.status(201).json({ message:"Libro actualizado",Libros:respuesta });
  }catch(error){
     console.error('Error al actualizar el libro:', error);
      res.status(500).json({ error: 'Error al actualizar el libros' });
  }
  
});

router.delete('/eliminar/:id', validarToken,async (req, res) => {
  const userinfo=req.user;
  try{
    const respuesta= await libroController.eliminarLibro(req,userinfo);
    if(respuesta.message){
        return res.status(400).json({ message: respuesta.message });
    }
    res.status(201).json({ message:"Libro eliminado con exito" });
  }catch(error){
     console.error('Error al eliminar el libro:', error);
      res.status(500).json({ error: 'Error al eliminar el libros' });
  }
  
});




module.exports = router;
