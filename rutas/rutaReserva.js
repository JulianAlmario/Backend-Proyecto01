const reservaController = require('../controladores/controladorReserva');
const express = require('express');
const validarToken=require('../Middleware/validarToken')
const router = express.Router();

router.post('/crear', validarToken,async (req, res) => {
   
  const userinfo=req.user;

   try{
     const respuesta= await reservaController.crearReserva(req,userinfo);
     if(respuesta.message){
         return res.status(400).json({ message: respuesta.message });
     }
     res.status(201).json({ message:'Reserva creada exitosamente', libro: respuesta });
   }catch(error){
      console.error('Error al crear el reserva:', error);
       res.status(500).json({ error: 'Error al crear el reserva' });
   }
   
});

router.get('/leer/usuario/:idUsuario',validarToken, async (req, res) => {
   const userinfo=req.user;
  try{
    const respuesta= await reservaController.leerReservaUsuario(req,userinfo);
    if(respuesta.message){
        return res.status(400).json({ message: respuesta.message });
    }
    res.status(201).json({ Reserva:respuesta });
  }catch(error){
     console.error('Error al buscar las reservas:', error);
      res.status(500).json({ error: 'Error al buscar las reservas' });
  }
  
});

router.get('/leer/libros/:libro',validarToken, async (req, res) => {
   const userinfo=req.user;
  try{
    const respuesta= await reservaController.leerReservaLibro(req,userinfo);
    if(respuesta.message){
        return res.status(400).json({ message: respuesta.message });
    }
    res.status(201).json({ Reserva:respuesta });
  }catch(error){
     console.error('Error al buscar las reservas:', error);
      res.status(500).json({ error: 'Error al buscar las reservas' });
  }
  
});

module.exports=router;