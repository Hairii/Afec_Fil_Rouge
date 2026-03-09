import db from '../config/db.js';

export const getGenres = async () => {
    try {
        const [genres] = await db.query('SELECT * FROM genres')
        return genres;
    } catch (error){
        console.error('erreur server(getGenres)',error.message);
        throw error;
    }
}