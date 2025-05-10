const express = require('express');
const mongoose = require('mongoose');
const rutasUsuarios = require('./rutas/rutasUsuarios');
const rutasLibros = require('./rutas/rutasLibro');
const rutaReserva=require('./rutas/rutaReserva');
const cors=require('cors');
require('dotenv').config({ path: './.env' });

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', rutasUsuarios);
app.use('/api/libros', rutasLibros);
app.use('/api/reserva',rutaReserva);


const connection=process.env.url;
mongoose.connect(connection).then(()=>{
    console.log("Conectado a la base de datos");
    app.listen(3000,()=>{
        console.log("Api funcionando en puerto 3000");
    });
}).catch((err)=>{
    console.log("Conexion fallida, error:"+err);
});