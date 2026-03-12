import db from "..config/db.js";

export const getRatings = async () => {
    try{
        const [rating] = await db.query('SELECT * FROM ratings');
        return rating;
    }catch(error){
        console.error("erreur server (getRatings)", error.message);
    }
};


export const createRating =  async (gameID, userID, rating) => {
    try{
        await db.query('INSERT INTO ratings (game_id, user_id, rating) VALUES (?, ?, ?,'),
        [gameID, userID, rating];
    }catch(error){
        console.error("server error (createRating)", error.message);

    }
}