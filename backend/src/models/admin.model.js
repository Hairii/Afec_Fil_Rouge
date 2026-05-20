import db from "../config/db.js";

export const getAllGamesAdmin = async () => {
  try {
    const [games] = await db.query(
      `SELECT g.*, GROUP_CONCAT(ge.name) AS genre_names
       FROM games g
       LEFT JOIN game_genres gg ON g.id = gg.game_id
       LEFT JOIN genres ge ON gg.genre_id = ge.id
       GROUP BY g.id
       ORDER BY g.name ASC`
    );
    return games.map((g) => ({
      id: g.id,
      name: g.name,
      released: g.released,
      metacritic: g.metacritic,
      img: g.img,
      genres: g.genre_names ? g.genre_names.split(',') : [],
    }));
  } catch (error) {
    console.error("erreur server (getAllGamesAdmin)", error.message);
    throw error;
  }
};

export const deleteGame = async (id) => {
  try {
    const [game] = await db.query("DELETE FROM games WHERE id = ?", [id]);
    return game.affectedRows > 0;
  } catch (error) {
    console.error("erreur server (deleteGame)", error.message);
  }
};

export const updateGame = async (id, fields) => {
  try {
    const allowed = ['name', 'released', 'metacritic', 'description', 'img'];
    const keys = Object.keys(fields).filter(
      (k) => allowed.includes(k) && fields[k] !== undefined && fields[k] !== ''
    );
    if (!keys.length) return false;

    const setClause = keys.map((k) => `${k} = ?`).join(', ');
    const values = [...keys.map((k) => fields[k]), id];

    const [result] = await db.query(`UPDATE games SET ${setClause} WHERE id = ?`, values);
    return result.affectedRows > 0;
  } catch (error) {
    console.error("erreur server (updateGame)", error.message);
    throw error;
  }
};

export const getReporteComments = async () => {
  try {
    const [comments] = await db.query(
      `SELECT comments.*, users.username
       FROM comments
       JOIN users ON comments.user_id = users.id
       WHERE comments.reported = 1`
    );
    return comments;
  } catch (error) {
    console.error('erreur server (getReportedComments)', error.message);
  }
};

export const unreportComment = async (id) => {
  try {
    const [comment] = await db.query('UPDATE comments SET reported = 0 WHERE id = ?', [id]);
    return comment.affectedRows > 0;
  } catch (error) {
    console.error('erreur server (unreportComment)', error.message);
  }
};

export const deleteComment = async (id) => {
  try {
    const [comment] = await db.query('DELETE FROM comments WHERE id = ?', [id]);
    return comment.affectedRows > 0;
  } catch (error) {
    console.error('erreur server (deleteComment)', error.message);
  }
};

export const deleteUser = async (id) => {
  try {
    await db.query('DELETE FROM comments WHERE user_id = ?', [id]);
    await db.query('DELETE FROM ratings WHERE user_id = ?', [id]);
    await db.query('DELETE FROM users WHERE id = ?', [id]);
    return true;
  } catch (error) {
    console.error('erreur server (deleteUser)', error.message);
  }
};