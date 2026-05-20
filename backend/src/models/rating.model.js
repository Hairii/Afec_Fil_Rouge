import db from "../config/db.js";

export const getRatings = async (game_id) => {
  try {
    const [rating] = await db.query("SELECT * FROM ratings WHERE game_id = ?", [game_id]);
    return rating;
  } catch (error) {
    console.error("erreur server (getRatings)", error.message);
  }
};

export const getRatingStats = async (game_id) => {
  try {
    const [rows] = await db.query(
      "SELECT AVG(rating) as average_rating, COUNT(*) as count FROM ratings WHERE game_id = ?",
      [game_id]
    );
    return rows[0];
  } catch (error) {
    console.error("erreur server (getRatingStats)", error.message);
  }
};

export const getUserRating = async (game_id, user_id) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM ratings WHERE game_id = ? AND user_id = ?",
      [game_id, user_id]
    );
    return rows[0] || null;
  } catch (error) {
    console.error("erreur server (getUserRating)", error.message);
  }
};

export const createRating = async (gameID, userID, rating) => {
  try {
    await db.query(
      "INSERT INTO ratings (game_id, user_id, rating) VALUES (?, ?, ?)",
      [gameID, userID, rating]
    );
  } catch (error) {
    console.error("server error (createRating)", error.message);
  }
};

export const updateRating = async (gameID, userID, rating) => {
  try {
    await db.query(
      "UPDATE ratings SET rating = ? WHERE game_id = ? AND user_id = ?",
      [rating, gameID, userID]
    );
  } catch (error) {
    console.error("server error (updateRating)", error.message);
  }
};