const mongoose = require('mongoose');
const libroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        unique: true
    },
    autor: {
        type: String,
        required: true
    },
    editorial: {
        type: String,
        required: true
    },
    fechaPublicacion: {
        type: String,
        required: true
    },
    genero: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    disponible: {
        type: Number,
        default: function () {
            return this.cantidad;
        }
    },
    inabilitado: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Libro', libroSchema);