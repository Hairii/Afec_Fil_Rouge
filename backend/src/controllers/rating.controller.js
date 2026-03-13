import { createRating, getRatings } from "../models/rating.model.js";
import { ratingSchema } from "../validations/rating.validation.js";

export const getAllRatings = async (req, res) => {
  try {
    const { game_id } = req.params;
    const ratings = await getRatings(game_id);
    res.json(ratings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "erreur server (getAllRatings" });
  }
};

export const addRating = async (req, res) => {
  try {
    const { error } = ratingSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    const { gameID, rating } = req.body;
    const userID = req.user.id; // recuperer par le token
    //verifier si le jeu a deja ete note par l'utilisateur 
    const existing = await getRatings(gameID);
    const alreadyRated = existing.find((r) => r.user_id === userID);
    if (alreadyRated) {
      return res.status(400).json({ message: "Vous avez déjà noté ce jeu" });
    }
    
    await createRating(gameID, userID, rating);
    res.status(201).json({ message: "rating créer" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "erreur server (creatRating" });
  }
};
