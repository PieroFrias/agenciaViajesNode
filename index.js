import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

const app = express();

// Conectar a la base de datos
db.authenticate()
    .then( () => console.log('Conexion a BD exitosa') )
    .catch( error => console.log(error) );

// Definir puerto
const port = process.env.DB_PORT || 4000;

// Habilitar PUG
app.set('view engine', 'pug');

// Obtener el año actual
app.use( (req, res, next) => {
    const year = new Date();

    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes';

    next();
});

// Agreagar body parser para leer los datos del formulario
app.use(express.urlencoded({ extended: true }));

// Definir la carpeta pública
app.use(express.static('public'));

// Agregar router
app.use('/', router);

app.listen(port, () => {
    console.log(`El servidor está funcionando en el puerto ${port}`);  
})