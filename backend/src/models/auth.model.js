import db from "../config/db.js";

export const createUser = async ({ mail, password, username }) => {
  try {
    await db.query(
      "INSERT INTO users (email, password, username, role) VALUES (?, ?, ?, 'membre')",
      [mail, password, username]
    );
  } catch (error) {
    console.error('erreur server(createUser)', error.message);
  }
};

export const getUserByMail = async (mail) => {
  try {
    const [user] = await db.query('SELECT * FROM users WHERE email = ?', [mail]);
    return user[0];
  } catch (error) {
    console.error('erreur server(getUser)', error.message);
  }
};

// Soft delete RGPD — anonymise les données et marque le compte comme supprimé
export const softDeleteUser = async (id) => {
  try {
    await db.query(
      `UPDATE users SET
        username = 'Utilisateur supprimé',
        email = CONCAT('deleted_', id, '@deleted.com'),
        password = '',
        is_deleted = TRUE,
        deleted_at = NOW()
       WHERE id = ?`,
      [id]
    );
  } catch (error) {
    console.error('erreur server(softDeleteUser)', error.message);
    throw error;
  }
};