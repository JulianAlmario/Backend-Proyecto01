const mongoose = require('mongoose');
const ReservaSchema = new mongoose.Schema({
    idUsuario: {
        type: String,
        required: true
    },
    libro: {
        type: String,
        required: true
    },
    fechaReserva: {
        type: String,
        default: () => new Date().toISOString().split('T')[0] 
    },
    fechaEntrega: {
        type: String, 
        required: true
    },
    inabilitado: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Reserva', ReservaSchema);