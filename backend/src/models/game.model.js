import db from "../config/db.js";

export const getGames = async () => {
    try {
        const [games] = await db.query('SELECT * FROM games');
        return games;
    } catch (error) {
        console.error('erreur server(getGames)', error.message);    
    }
}

export const getGameById = async (id) => {
    try{
        const [game] = await db.query('SELECT * FROM games WHERE id = ?', [id]);
        return game[0];
    }catch(error){
        console.error('erreur server(getGameById)', error.message);    
    }
}