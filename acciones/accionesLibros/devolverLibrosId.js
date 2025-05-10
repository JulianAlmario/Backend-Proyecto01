const Libro=require('../../modelos/modeloLibro');
const mongoose = require('mongoose');


async function devolverLibrosId(id){
  if(!mongoose.Types.ObjectId.isValid(id)){
    return {message:"El id no es valido"}
  }
  const libro= await Libro.findOne({_id:id});
  if(libro){
    return libro;
  }else{
    return {message:"No se encontro ese libro"}
  }
}

module.exports= devolverLibrosId;