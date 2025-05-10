const crearUsuarioAccion= require('../acciones/accionesUsuarios/crearUsuario');
const devolverUsuario=require('../acciones/accionesUsuarios/devolverUsuario');
const usuarioActualizarAccion=require('../acciones/accionesUsuarios/actualizarUsuario');
const devovlverTodosUsuarios=require('../acciones/accionesUsuarios/devolverTodosUsuarios');
const bcrypt= require('bcrypt');
require('dotenv').config({ path: './.env' });
const jwt=require('jsonwebtoken');

async function crearUsuario(req){
    const {nombre,correo,clave}=req.body;
   if(!nombre || !correo || !clave){
        return {message:'Faltan datos obligatorios'};
    }

   

    if(clave.length<6){
        return {message:'La clave debe tener al menos 6 caracteres'};
    }

    if(!correo.split("").includes("@")){
        return {message:"No es un correo valido"}
    }

    const concifrada=await bcrypt.hash(clave, Number(process.env.saltrounds));
     
    const res= await crearUsuarioAccion({nombre:nombre,correo:correo,clave:concifrada});

    return res;
}

async function leerUsuario(req){
  const {correo,clave}=req.body;

  if(!correo||!clave){
    return {message:'Faltan el correo y/o la clave'};
  }
  
  const usuario=await devolverUsuario(req.body);

  if(usuario.message){
    return usuario;
  }


  if(usuario.inabilitado){
    return {message:"Este usuario no existe"}
  }
  
  const isMatch= bcrypt.compareSync(clave,usuario.clave);

  if(!isMatch){
    return {message:"La contraseña no es correcta"}
  }

const token = jwt.sign(
    { id: usuario._id, nombre:usuario.nombre ,correo: usuario.correo, rol: usuario.rol },
    process.env.clave_secreta,
    {
        expiresIn: "1h",
    }
);

return {token: token };

}

async function ListaUsuario(userinfo){
  if(!userinfo.rol.includes("leer-usuario") && !userinfo.rol.includes("administrador")){
      return {message:"No tienes permisos para realizar esta accion"}
    }

    const usuarios=await devovlverTodosUsuarios();

    if(!usuarios){
      return {message:"Error al traer los usuarios"}
    }

    return usuarios
}

async function actualizarUsuario(req,userinfo){
  const {id,nombre,correo, clave, rol,inabilitado}=req.body;


  if(!id){
    return {message:"Se requiere el id del usuario"}
  }


  if(userinfo.id!==id){
    if(!userinfo.rol.includes("eliminar-usuario") && !userinfo.rol.includes("administrador")){
      return {message:"No tienes permisos para realizar esta accion"}
    }
  }

if(rol && userinfo.id===id){
  return {message:"No te puedes asignar roles"}
}

if(rol && !userinfo.rol.includes("administrador") ){
 return {message:"No le puedes asignar roles a otros usuarios"}
}

if(!nombre && !correo && !clave && !rol && inabilitado===undefined){
  return {message:'No coloco ningun dato a actualizar '};
}

const UserRoles=['administrador','usuario','crear-libro','eliminar-libro',
  'actualizar-libro','eliminar-usuario','actualizar-usuario',"leer-usuario","leer-reserva"];

if(rol){
  const validarRol=rol.map((a)=>UserRoles.includes(a)); 

if(validarRol.includes(false)){
    return {message:'Tienes uno o varios roles invalidos'};
}
}


if(correo){
  if(!correo.split("").includes("@")){
    return {message:"No es un correo valido"}
}
}

let datos;

  if(clave){
    if(clave.length<6){
      return {message:'La clave debe tener al menos 6 caracteres'};
  }

  const concifrada=await bcrypt.hash(clave, Number(process.env.saltrounds));

   datos={
    nombre:nombre,
    correo:correo,
    clave:concifrada,
    rol:rol,
    inabilitado:inabilitado  
  }
  }else{
     datos={
      nombre:nombre,
      correo:correo,
      rol:rol,
      inabilitado:inabilitado    
    }
  }
  
  const usuario=await usuarioActualizarAccion(id,datos)

  
  return usuario;

}

async function eliminarUsuario(req,userinfo){
  const {id}=req.params;

  if(!id){
    return {message:"Se requiere el id del usuario"}
  }

if(userinfo.id!==id){
  if(!userinfo.rol.includes("eliminar-usuario") && !userinfo.rol.includes("administrador")){
    return {message:"No tienes permisos para realizar esta accion"}
  }
}

  const usuario=await usuarioActualizarAccion(id,{inabilitado:true})

  return usuario;


}

module.exports = {
    crearUsuario,
    leerUsuario,
    ListaUsuario,
    actualizarUsuario,
    eliminarUsuario
};

