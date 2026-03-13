import db from "../config/db.js";

export const deleteGame = async (id) => {
  try {
    const [game] = await db.query("DELETE FROM games WHERE id = ?", [id]);
    return game.affectedRows > 0;
  } catch (error) {
    console.error("erreur server (deleteGame)", error.message);
  }
};

export const updateGame = async (id, name, released) => {
  try {
    const [game] = await db.query(
      "UPDATE games SET name = ?, released = ? WHERE id = ?",
      [name, released, id],
    );
  } catch (error) {
    console.error("erreur server (updateGame)", error.message);
    throw error;
  }
};

export const getReporteComments = async () => {
    try {
        const [comments] = await db.query('SELECT * FROM comments WHERE reported = 1');
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
}

export const deleteComment = async (id) => {
    try {
        const [comment] = await db.query ('DELETE FROM comments WHERE id = ?', [id]);
        return comment.affectedRows > 0;
    } catch (error) {
        console.error('erreur server (deleteComment)', error.message);
    }
}

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