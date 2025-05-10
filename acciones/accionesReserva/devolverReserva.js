
const Reserva=require('../../modelos/modeloReserva');

async function devolverReserva(){
    const reservas=Reserva.find();
    return reservas;
}

module.exports=devolverReserva;