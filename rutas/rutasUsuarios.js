const usuarioController = require('../controladores/controladorUsuario');
const express = require('express');
const validarToken = require('../Middleware/validarToken');
const router = express.Router();

router.post('/registro', async (req, res) => {
 
   try{
     const respuesta= await usuarioController.crearUsuario(req);
     if(respuesta.message){
         return res.status(400).json({ message: respuesta.message });
     }
     res.status(201).json({ message: 'Usuario creado exitosamente', usuario: respuesta });
   }catch(error){
      console.error('Error al crear el usuario:', error);
       res.status(500).json({ error: 'Error al crear el usuario' });
   }
   
});


router.post('/iniciar-sesion', async (req,res)=>{
  try{
    const respuesta=await usuarioController.leerUsuario(req);
    if(respuesta.message){
      return res.status(400).json({ message: respuesta.message });
  }
  
  return res.status(200).json({message: "Inicio de sesión exitoso, guarda el token para poder autenticarte, expira en 1 hora ",token:respuesta.token});
  
  }catch(error){
    console.error('Error al leer el usuario:', error);
     res.status(500).json({ error: 'Error al leer el usuario' });
  }
  
  });


  router.get("/lista-usuarios",validarToken, async (req,res)=>{
    const userinfo=req.user;
  try{
    const respuesta=await usuarioController.ListaUsuario(userinfo);
    if(respuesta.message){
      return res.status(400).json({ message: respuesta.message });
  }
  
  return res.status(200).json({Usuarios:respuesta});
  
  }catch(error){
    console.error('Error al leer los usuarios:', error);
     res.status(500).json({ error: 'Error al leer los usuario' });
  }
  
  })

  router.patch("/usuario/actualizar", validarToken, async (req,res)=>{
    const userinfo=req.user;
    try{
     const respuesta=await usuarioController.actualizarUsuario(req,userinfo);
     if(respuesta.message){
      return res.status(400).json({ message: respuesta.message });
     }
     res.status(200).json({message:"Se actualizo el usuario", usuario:respuesta})
    }catch(error){
        console.error("Error al actualizar el usuario");
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
  }
)

router.delete('/usuario/eliminar/:id', validarToken, async (req, res) => {
  const userinfo=req.user;
  try{
    const respuesta= await usuarioController.eliminarUsuario(req,userinfo);
    if(respuesta.message){
        return res.status(400).json({ message: respuesta.message });
    }
    res.status(201).json({ message:"Usuario eliminado con exito" });
  }catch(error){
     console.error('Error al eliminar el usuario:', error);
      res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
})

module.exports = router;