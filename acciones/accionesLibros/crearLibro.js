const Libro=require('../../modelos/modeloLibro');


async function crearLibroAccion(libro){
  const libroExistente= await Libro.findOne({titulo:libro.titulo});
  if(libroExistente){
    return {message:'Este libro ya existe en la base de datos'};
  }
    const nuevoLibro= new Libro({
        titulo:libro.titulo,
        autor:libro.autor,
        editorial:libro.editorial,
        fechaPublicacion:libro.fechaPublicacion,
        genero:libro.genero,
        cantidad:libro.cantidad
    });
    await nuevoLibro.save();

    return nuevoLibro;
}

module.exports= crearLibroAccion;