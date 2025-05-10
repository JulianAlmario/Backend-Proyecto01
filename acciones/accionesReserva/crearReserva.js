const Reserva=require('../../modelos/modeloReserva');


async function crearReservaAccion(datos){
    const nuevaReserva= new Reserva({
        idUsuario:datos.idUsuario,
        libro:datos.libro,
        fechaEntrega:datos.fechaEntrega
    });
    await nuevaReserva.save();

    return nuevaReserva;
}

module.exports= crearReservaAccion;