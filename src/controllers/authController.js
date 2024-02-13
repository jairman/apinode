const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');


import {getConnection} from './../database/database'

const  login = async (req, res) => {
    try {
        const { email, password } = req.body;       
        //Verificar campos 
        if(!email || !password){
            return res.status(400).send({
                error: 'Incomplete data.'
            });
        }
        const connection =  await getConnection();
          // Verifica si el usuario existe en la base de datos
          connection.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
            if (error) {
              console.error(error);
              return res.status(500).json({ message: 'Error de servidor' });
            }
        
            if (results.length === 0) {
              return res.status(401).json({ message: 'Credenciales incorrectas' });
            }
        
            const user = results[0];
        
            // Verifica la contraseña
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
              return res.status(401).json({ message: 'Credenciales incorrectas' });
            }
        
            // Genera el token JWT
            const token = jwt.sign({ userId: user.id }, 'tu_secreto', { expiresIn: '1h' });
        
            res.status(200).json({ token });
          });


    } catch (error) {
        res.status(500);
        res.send({error: message});
    } 
};

const register = async (req, res)=> {

    try {

        const { email, password, name } = req.body;
           //Verificar campos 
           if(!email || !password || !name){
            return res.status(400).send({
                error: 'Incomplete data.'
            });
        }
        const connection =  await getConnection();

        // Verifica si el usuario ya existe en la base de datos
        connection.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error de servidor' });
          }
      
          if (results.length > 0) {
            return res.status(400).json({ message: 'El usuario ya existe' });
          }
      
          // Hashea la contraseña
          const hashedPassword = await bcrypt.hash(password, 10);
      
          // Inserta el nuevo usuario en la base de datos
          connection.query('INSERT INTO users (email, password, name) VALUES (?, ?, ?)', [email, hashedPassword, name], (error, results) => {
            if (error) {
              console.error(error);
              return res.status(500).json({ message: 'Error de servidor' });
            }
      
            // Genera el token JWT
            const token = jwt.sign({ userId: results.insertId }, 'tu_secreto', { expiresIn: '1h' });
      
            res.status(201).json({ token });
          });
        });
 
     } catch (error) {
         res.status(500);
         res.send({error: message});
     } 
};


export const methods = {
   login,
   register
}





