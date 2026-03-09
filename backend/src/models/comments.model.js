import db from "../config/db.js";

export const getComments = async () => {
  try {
    const [comments] = await db.query("SELECT * FROM comments");
    return comments;
  } catch (error) {
    console.error("erreur server (getCommnets)", error.message);
    throw error;
  }
};

export const createComments = async ({ content, userID, gameID }) => {
  try {
    await db.query(
      "INSERT INTO comments (content, user_id, game_id ) VALUES (?, ?, ?)",
      [content, userID, gameID],
    );
  } catch (error) {
    console.error("server error (createComments)", error.message);
  }
};

export const deleteComments = async (id) => {
    try{
        const [comments] = await db.query('DELETE FROM comments WHERE id = ?',
            [id]
        )
        return comments.affectedRows > 0;
    }catch(error){
    console.error('erreur server (deleteCOmments)',error.message );
    throw error;
    }
};

export const getCommentsByGame = async (game_id) => {
    try{
        const [comments] = await db.query ('SELECT * FROM comments WHERE game_id = ?',
            [game_id]
        )
        return comments;
    }catch(error){
        console.error('erreur server (getCommentsByGame)', error.message);
    }
}
