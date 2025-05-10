const Usuario= require('../../modelos/modeloUsuario');

async function DevolverUsuarioId(data){
  const usuario=await Usuario.findOne({_id:data});
  if(usuario){
    return usuario;
  }else{
    return {message:"Usuario no encontrado"}
  }
  
}

module.exports= DevolverUsuarioId;