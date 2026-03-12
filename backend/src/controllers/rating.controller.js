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

export const addRating = async (req, res) => {
    try{
        const {gameID, rating} = req.body;
        const userID = req.user.id; // recuperer par le token
        await createRating(gameID, userID, rating);
        res.status(201).json ({message: "rating créer"});
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'erreur server (creatRating'});  
    }
}