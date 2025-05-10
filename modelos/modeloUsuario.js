const mongoose= require('mongoose');

const usuarioSchema= new mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        unique:true
    },
    correo:{
        type:String,
        required:true,
        unique:true
    },
    clave:{
        type:String,
        required:true
    },
    rol:{
        type:[String], 
        enum:['administrador','usuario','crear-libro','eliminar-libro',
            'actualizar-libro','eliminar-usuario','actualizar-usuario'],
        default:['usuario']
    },
    inabilitado:{
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model('Usuario',usuarioSchema);