const Usuario= require('../../modelos/modeloUsuario');
const mongoose = require('mongoose');


async function usuarioActualizarAccion(id,data){
    if(!mongoose.Types.ObjectId.isValid(id)){
        return {message:"El id no es valido"}
      }
  
    const usuario=await Usuario.findByIdAndUpdate(id,data,{new:true});
    if(usuario){
      return usuario;
    }else{
      return {message:"No se encontro el usuario a actualizar"}
    }
  }

  module.exports=usuarioActualizarAccion;
