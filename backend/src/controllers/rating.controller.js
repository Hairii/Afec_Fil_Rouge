import {createRating, getRatings} from '../models/rating.model.js';

export const getAllRatings = async (req, res) => {
    try{
        const ratings = await getRatings();
        res.json(ratings);
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'erreur server (getAllRatings'})
    }
};