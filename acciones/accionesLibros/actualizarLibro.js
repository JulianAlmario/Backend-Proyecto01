const Libro=require('../../modelos/modeloLibro');
const mongoose = require('mongoose');

async function ActualizarLibroAccion(id,datos){
  if(!mongoose.Types.ObjectId.isValid(id)){
      return {message:"El id no es valido"}
    }

  const libro=await Libro.findByIdAndUpdate(id,datos,{new:true});
  if(libro){
    return libro;
  }else{
    return {message:"No se encontro el libro a actualizar"}
  }
}

module.exports=ActualizarLibroAccion;