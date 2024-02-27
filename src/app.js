import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Routes

import languageRoutes from './routes/language.routes.js';
import authRouter from './routes/auth.routes.js';



const app = express();


// Settings
app.set( 'port', 4000 );

// Middlewares
app.use( morgan('dev') );
app.use( express.json() );
app.use(cors({credentials: true, origin: 'http://localhost:5173'}));


// Routes

// Define tus rutas para el login, registro, etc.
app.use('/api/auth', authRouter);

app.use('/api/languages', languageRoutes);




export default app;