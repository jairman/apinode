
import {getConnection} from './../database/database'

const getLanguages = async (req, res)=> {

    try {

        const connection =  await getConnection();
        const result = await connection.query( `SELECT id, name, programers FROM language`);
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send({error: message});
    } 
};



const getLanguage = async (req, res)=> {

    try {
        
        const {id} = req.params;
        const connection =  await getConnection();
        const result = await connection.query( `SELECT id, name, programers FROM language where id = ?`, id);
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send({error: message});
    } 
};


const addLanguages = async (req, res)=> {

    try {
       
        const {name, programers} = req.body;
        if (!name || !programers ) {
            res.status(400).json( {message: 'Faltan datos por enviar'} );
        };

        const language ={
            name,
            programers
        }

        const connection =  await getConnection();
        const result = await connection.query( 'INSERT INTO language SET ?', language  )
        
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send({error: message});
    } 
};

const updateLanguage = async (req, res)=> {

    try {
        const {name, programers} = req.body;
        const {id} = req.params;

        if (!name || !programers || !id) {
            res.status(400).json( {message: 'Faltan datos por enviar'} );
        };
        const language ={
           
            name,
            programers
        }
        
        const connection =  await getConnection();
        const result = await connection.query( `UPDATE language SET  ? WHERE id = ?`, [language , id]  );
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send({error: message});
    } 
};



const deleteLanguage = async (req, res)=> {

    try {
        
        const {id} = req.params;
        const connection =  await getConnection();
        const result = await connection.query( `DELETE FROM language where id = ?`, id);
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send({error: message});
    } 
};

export const methods = {
    getLanguages,
    getLanguage,
    addLanguages,
    updateLanguage,
    deleteLanguage
}