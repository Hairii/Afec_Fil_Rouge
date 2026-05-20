import { createRating, updateRating, getUserRating, getRatingStats } from "../models/rating.model.js";
import { ratingSchema } from "../validations/rating.validation.js";

export const getAllRatings = async (req, res) => {
  try {
    const { game_id } = req.params;
    const stats = await getRatingStats(game_id);

    let userRating = null;
    if (req.user) {
      const existing = await getUserRating(game_id, req.user.id);
      userRating = existing ? existing.rating : null;
    }

    res.json({ ...stats, userRating });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "erreur server (getAllRatings)" });
  }
};

export const addRating = async (req, res) => {
  try {
    const { error } = ratingSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { gameID, rating } = req.body;
    const userID = req.user.id;

    const existing = await getUserRating(gameID, userID);
    if (existing) {
      await updateRating(gameID, userID, rating);
      return res.status(200).json({ message: "note mise à jour" });
    }

    await createRating(gameID, userID, rating);
    res.status(201).json({ message: "rating créer" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "erreur server (createRating)" });
  }
};