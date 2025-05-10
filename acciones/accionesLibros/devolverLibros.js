const Libro=require('../../modelos/modeloLibro');


async function devolverLibros(){
  const Libros= await Libro.find();
    return Libros;
}

module.exports= devolverLibros;