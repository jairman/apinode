import express from 'express';
import morgan from 'morgan';

// Routes

import languageRoutes from './routes/language.routes';
import authRouter from './routes/auth.routes';



const app = express();


// Settings
app.set( 'port', 4000 );

// Middlewares
app.use( morgan('dev') );
app.use( express.json() );


// Routes

// Define tus rutas para el login, registro, etc.
app.use('/api/auth', authRouter);

app.use('/api/languages', languageRoutes);


export default app;