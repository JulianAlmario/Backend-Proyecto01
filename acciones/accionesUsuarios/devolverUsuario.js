const Usuario= require('../../modelos/modeloUsuario');

async function DevolverUsuario(data){
  const usuario=await Usuario.findOne({correo:data.correo});
  if(usuario){
    return usuario;
  }else{
    return {message:"Usuario no encontrado"}
  }
  
}

module.exports= DevolverUsuario;