const crearLibroAccion=require('../acciones/accionesLibros/crearLibro');
const devolverLibros=require('../acciones/accionesLibros/devolverLibros');
const devolverLibrosId=require('../acciones/accionesLibros/devolverLibrosId');
const actualizarLibroAccion=require('../acciones/accionesLibros/actualizarLibro');

async function crearLibro(req,userinfo){
   
    if(!userinfo.rol.includes("crear-libro") && !userinfo.rol.includes("administrador")){
        return {message:"No tienes permisos para realizar esta accion"}
    }

    const {titulo, autor,editorial,fechaPublicacion,genero,cantidad}=req.body;
    

    if(!titulo || !autor || !editorial||!fechaPublicacion||!genero||!cantidad){
        return {message:'Faltan datos obligatorios, estos son los datos:titulo, autor, editorial, fechaPublicacion, genero, cantidad'};
    }

    const fechaRegex = /^\d{4}(-\d{2}-\d{2})?$/;
    if (!fechaRegex.test(fechaPublicacion)) {
        return { message: 'La fecha de publicación debe estar en formato año-mes-día (YYYY-MM-DD) o solo el año (YYYY)' };
    }

    const res=await crearLibroAccion(req.body);

    return res;

}

async function leerLibrosFiltros(req) {
    const { titulo, autor, editorial, fechaPublicacion, genero, disponible, inabilitado } = req.query;

    if (fechaPublicacion) {
        const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!fechaRegex.test(fechaPublicacion)) {
            return { message: 'La fecha de publicación debe estar en formato año-mes-día (YYYY-MM-DD)' };
        }
    }

    let libros = await devolverLibros();

    if (!inabilitado) {
        libros = libros.filter((a) => a.inabilitado === false);
    }

    const normalize = (str) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if (titulo) {
        const normalizedTitulo = normalize(titulo);
        libros = libros.filter((a) => normalize(a.titulo) === normalizedTitulo);
        return libros;
    }

    if (autor) {
        const normalizedAutor = normalize(autor);
        libros = libros.filter((a) => normalize(a.autor) === normalizedAutor);
    }

    if (editorial) {
        const normalizedEditorial = normalize(editorial);
        libros = libros.filter((a) => normalize(a.editorial) === normalizedEditorial);
    }

    if (fechaPublicacion) {
        libros = libros.filter((a) => a.fechaPublicacion === fechaPublicacion);
    }

    if (genero) {
        const normalizedGenero = normalize(genero);
        libros = libros.filter((a) => normalize(a.genero) === normalizedGenero);
    }

    if (disponible) {
        libros = libros.filter((a) => a.disponible > 0);
    }

    if (libros.length === 0) {
        return { message: "No se encontraron libros acorde los filtros que pusistes" };
    }

    return libros;
}

async function leerLibrosId(req){
    const {id}=req.params;

    const libro=await devolverLibrosId(id);
    
    return libro;

}

async function actualizarLibro(req,userinfo){
 const {id,titulo, autor,editorial,fechaPublicacion,genero,cantidad,inabilitado}=req.body;

 if(!userinfo.rol.includes("actualizar-libro") && !userinfo.rol.includes("administrador")){
    return {message:"No tienes permisos para realizar esta accion"}
}

if(!id){
   return {message:"Se requiere el id del libro"}
}

if(!titulo && !autor && !editorial && !fechaPublicacion && !genero && !cantidad && inabilitado===undefined){
    return {message:'No coloco ningun dato para actualizar'};
}


 if(fechaPublicacion){
    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
if (!fechaRegex.test(fechaPublicacion)) {
    return { message: 'La fecha de publicación debe estar en formato año-mes-día (YYYY-MM-DD)' };
}
 }

 const datos={
    titulo:titulo,
    autor:autor,
    editorial:editorial,
    genero:genero,
    cantidad:cantidad,
    inabilitado:inabilitado
 }
 const libro=await actualizarLibroAccion(id,datos);

 return libro;
 
}


async function eliminarLibro(req,userinfo){
    const {id}=req.params;

    if(!id){
        return  {message:"Se requirere el id del libro"}
    }

    if(!userinfo.rol.includes("eliminar-libro") && !userinfo.rol.includes("administrador")){
        return {message:"No tienes permisos para realizar esta accion"}
    }

    const libro=await actualizarLibroAccion(id,{inabilitado:true});

    if(libro.inabilitado){
        return libro;
    }else{
        return {message:"El libro no se pudo eliminar"}
    }
}


module.exports={
    crearLibro,
    leerLibrosFiltros,
    leerLibrosId,
    actualizarLibro,
    eliminarLibro
};