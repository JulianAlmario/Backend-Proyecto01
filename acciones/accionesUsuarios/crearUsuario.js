const Usuario= require('../../modelos/modeloUsuario');


async function crearUsuarioAccion(usuario){
  const usuarioExistente= await Usuario.findOne({correo:usuario.correo});
  if(usuarioExistente){
    return {message:'Este correo ya está en uso'};
  }
    const nuevoUsuario= new Usuario({
        nombre: usuario.nombre,
        correo: usuario.correo,
        clave: usuario.clave,
    });
    await nuevoUsuario.save();

    return nuevoUsuario;
}

module.exports= crearUsuarioAccion;