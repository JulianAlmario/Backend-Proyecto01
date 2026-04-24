const express = require('express');
const mongoose = require('mongoose');
const rutasUsuarios = require('./rutas/rutasUsuarios');
const rutasLibros = require('./rutas/rutasLibro');
const rutaReserva=require('./rutas/rutaReserva');
const cors=require('cors');
require('dotenv').config({ path: './.env' });

const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:4321','https://digital-library-node.onrender.com/'],
    methods: 'GET,POST,PUT,DELETE,PATCH',
    allowedHeaders: 'Content-Type,Authorization'
}));

app.use('/api', rutasUsuarios);
app.use('/api/libros', rutasLibros);
app.use('/api/reserva',rutaReserva);


const connection=process.env.url;

// For now, start server without MongoDB to show API structure
// You can connect to MongoDB later when available
app.listen(3000,()=>{
    console.log("✅ Backend API funcionando en puerto 3000");
    console.log("📚 Endpoints disponibles:");
    console.log("   - POST /api/registro");
    console.log("   - POST /api/iniciar-sesion");
    console.log("   - GET /api/lista-usuarios");
    console.log("   - POST /api/libros/crear");
    console.log("   - GET /api/libros/buscar/filtros");
    console.log("   - GET /api/libros/buscar/:id");
    console.log("   - POST /api/reserva/crear");
    console.log("   - GET /api/reserva/devolver");
});


// Connect to MongoDB when available
if (connection && connection !== 'mongodb://localhost:27017/biblioteca') {
    mongoose.connect(connection).then(()=>{
        console.log("✅ Conectado a MongoDB");
    }).catch((err)=>{
        console.log("⚠️  Conexion MongoDB fallida, error:"+err);
        console.log("💡 El servidor sigue funcionando con datos de prueba");
    });
} else {
    console.log("⚠️  MongoDB no configurado. Usando modo de demostración.");
}