const Usuario= require('../../modelos/modeloUsuario');

async function DevolverTodosUsuario(dta){
  const usuarios=await Usuario.find();
  return usuarios;
  
}

module.exports= DevolverTodosUsuario;