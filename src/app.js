import 'dotenv/config.js';
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import initializePassport from '../src/config/passport.config.js';
import { passportCall } from './utils.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';
import userRouter from './routes/users.router.js';

const app = express();
const PORT = 3000;

// Configurar __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const MONGODB = process.env.MONGODB;



// Configuración de Handlebars
app.engine('.handlebars', engine());
app.set('views', __dirname + '/views'); 
app.set('view engine', 'handlebars');

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// Middleware para manejar cookies
app.use(express.static('public'));
app.use(express.json());
initializePassport(passport);
app.use(passport.initialize());
app.use(cookieParser());


// Conexión a MongoDB
mongoose.connect(MONGODB);

// Configuración de sesiones
app.use(session({
    store: MongoStore.create({ 
        mongoUrl: MONGODB, 
        ttl: 600 
    }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

// Inicialización de Passport
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.get('/current', passportCall('jwt'), (req, res) => {
    if (!req.user) {
        res.status(401).send({ error: 'No user found' });
    } else {
        res.send(req.user);
    }
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});


app.use('/', userRouter);  

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
