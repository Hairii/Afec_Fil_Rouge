import {
  getAllGamesAdmin,
  deleteGame,
  updateGame,
  getReporteComments,
  unreportComment,
  deleteComment,
  deleteUser,
} from "../models/admin.model.js";

export const getAdminGames = async (req, res) => {
  try {
    const games = await getAllGamesAdmin();
    res.json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "erreur server (getAdminGames)" });
  }
};

export const deletedGame = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteGame(id);
    if (!deleted) {
      return res.status(404).json({ message: "jeu non trouvé" });
    }
    res.status(200).json({ message: "jeu supprimé" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "erreur server (deleteGame)" });
  }
};

export const patchGame = async (req, res) => {
  try {
    const { id } = req.params;
    const fields = req.body;
    const updated = await updateGame(id, fields);
    if (!updated) {
      return res.status(404).json({ message: "jeu non trouvé ou aucun champ valide" });
    }
    res.status(200).json({ message: "jeu mis à jour" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "erreur server (patchGame)" });
  }
};

export const getReportedComments = async (req, res) => {
  try {
    const comments = await getReporteComments();
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "erreur server (getReportedComments)" });
  }
};

export const unReportedComment = async (req, res) => {
  try {
    const { id } = req.params;
    const unreported = await unreportComment(id);
    if (!unreported) {
      return res.status(404).json({ message: "commentaire non trouvé" });
    }
    res.status(200).json({ message: "commentaire désignalé" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "erreur server (unreportComment)" });
  }
};

export const deletedComments = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteComment(id);
    if (!deleted) {
      return res.status(404).json({ message: "commentaire non trouvé" });
    }
    res.status(200).json({ message: "commentaire supprimé" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "erreur server (deleteComments)" });
  }
};

export const deletedUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteUser(id);
    if (!deleted) {
      return res.status(404).json({ message: "utilisateur non trouvé" });
    }
    res.status(200).json({ message: "utilisateur supprimé" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "erreur server (deleteUser)" });
  }
};