import {getGenres} from '../models/genre.model.js';

export const getAllGenres = async (req, res) => {
    try{
        const genres = await getGenres();
        res.json(genres);
    }catch(error){
        console.error(error);
        res.status(500).json ({message: 'Erreur server (getAllGenres)'})
    }
};