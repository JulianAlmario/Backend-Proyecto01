const crearReservaAccion=require('../acciones/accionesReserva/crearReserva');
const devolverReserva=require('../acciones/accionesReserva/devolverReserva');
const devolverLibrosId=require('../acciones/accionesLibros/devolverLibrosId');
const actualizarLibroAccion=require('../acciones/accionesLibros/actualizarLibro');
const devolverUsuarioId=require('../acciones/accionesUsuarios/devolverUsuarioId');

async function crearReserva(req,userinfo){
   const {idLibro,fechaEntrega}=req.body;
   
   
   if(!idLibro || !fechaEntrega){
     return {message:"Te falta proporiconar el idLibro o/y la fechaEntrega"}
   }

    if(fechaEntrega){
        const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!fechaRegex.test(fechaEntrega)) {
        return { message: 'La fecha de entrega debe estar en formato año-mes-día (YYYY-MM-DD)' };
    }
     }

   const libro=await devolverLibrosId(idLibro);

   if(libro.message){
    return libro
   }

   if(libro.inabilitado){
    return {message:"Este libro no existe"}
   }

   if(libro.disponible>0){
      actualizarLibroAccion(libro._id,{disponible:libro.disponible-1})
   }else{
    return {message:"Este libro no esta disponible"}
   }

   const reserva =await crearReservaAccion({idUsuario:userinfo.id,libro:libro.titulo,fechaEntrega:fechaEntrega});
   
   return reserva

}


async function leerReservaUsuario(req,userinfo){
  const {idUsuario}=req.params;


    if(userinfo.id!==idUsuario){
   if(!userinfo.rol.includes("leer-reserva") && !userinfo.rol.includes("administrador")){
        return {message:"No tienes permisos para realizar esta accion"}
    }
   }

    let reserva=await devolverReserva();

    console.log
    reserva = reserva.filter((a) => a.idUsuario === idUsuario);
  

  if(reserva.length>0){
    return reserva;
  }else{
    return {message:"No se encontraron reservas de acuerdo a los filtros que pusistes"}
  }
}


async function leerReservaLibro(req,userinfo){
  const {libro}=req.params;

   if(!userinfo.rol.includes("leer-reserva") && !userinfo.rol.includes("administrador")){
        return {message:"No tienes permisos para realizar esta accion"}
    }

    let reserva=await devolverReserva();

    
    reserva = reserva.filter((a) => a.libro === libro);
    reserva = await Promise.all(reserva.map(async (a) => {
        const usuario = await devolverUsuarioId(a.idUsuario);
        return {
          nombreLibro: a.libro,
          nombreUsuario: usuario.nombre,
          fechaEntrega: a.fechaEntrega,
          fechaReserva: a.fechaReserva
        };
    }));
    
    
  

  if(reserva.length>0){
    return reserva;
  }else{
    return {message:"No se encontraron las reservas de este libro"}
  }
}



module.exports={
    crearReserva,
    leerReservaUsuario,
    leerReservaLibro
}