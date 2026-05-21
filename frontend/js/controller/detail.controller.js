import { getGameById } from '../api/game.api.js';
import { getComments, addComments, reportComment } from '../api/comment.api.js';
import { getRatings, addRating } from '../api/rating.api.js';
import { getUser } from '../api/auth.api.js';
import {
  renderGame,
  renderRating,
  renderRatingForm,
  renderRatingGuest,
  renderRatingMessage,
  renderComments,
  renderCommentForm,
  renderCommentGuest,
  renderCommentMessage,
  renderError,
} from '../view/detail.view.js';

const params = new URLSearchParams(window.location.search);
const gameId = params.get('id');

let selectedRating = null;
let currentUser = null;

const init = async () => {
  if (!gameId) {
    renderError();
    return;
  }

  const [game, ratingData, comments, user] = await Promise.all([
    getGameById(gameId),
    getRatings(gameId),
    getComments(gameId),
    getUser(),
  ]);

  currentUser = user && !user.message ? user : null;

  if (!game || game.message) {
    renderError();
    return;
  }

  renderGame(game);
  renderRating(ratingData);

  const isConnected = !!currentUser;

  if (isConnected) {
    selectedRating = ratingData?.userRating || null;
    renderRatingForm((note) => { selectedRating = note; }, ratingData?.userRating || null);
    renderCommentForm();
  } else {
    renderRatingGuest();
    renderCommentGuest();
  }

  renderComments(comments, currentUser, handleDeleteComment, handleReportComment);

  // envoi de la note
  document.getElementById('submitRating')?.addEventListener('click', async () => {
    if (!selectedRating) {
      renderRatingMessage('Sélectionnez une note avant d\'envoyer.', true);
      return;
    }
    const result = await addRating(gameId, selectedRating);
    if (result?.message === 'rating créer' || result?.message === 'note mise à jour') {
      renderRatingMessage('Note enregistrée ! 🎮');
      const updated = await getRatings(gameId);
      renderRating(updated);
    } else {
      renderRatingMessage(result?.message || 'Erreur lors de l\'envoi.', true);
    }
  });

  // envoi d'un commentaire
  document.getElementById('submitComment')?.addEventListener('click', async () => {
    const input = document.getElementById('commentInput');
    const content = input?.value.trim();
    if (!content) {
      renderCommentMessage('Le commentaire ne peut pas être vide.', true);
      return;
    }
    const result = await addComments(gameId, content);
    if (result?.message === 'commentaire créer') {
      renderCommentMessage('Commentaire publié !');
      input.value = '';
      const updatedComments = await getComments(gameId);
      renderComments(updatedComments, currentUser, handleDeleteComment, handleReportComment);
    } else {
      renderCommentMessage(result?.message || 'Erreur lors de la publication.', true);
    }
  });
};

// supp commentaire
const handleDeleteComment = async (commentId) => {
  if (!confirm('Supprimer ce commentaire ?')) return;
  try {
    const response = await fetch(`/api/comments/delete/${commentId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (response.ok) {
      const updatedComments = await getComments(gameId);
      renderComments(updatedComments, currentUser, handleDeleteComment, handleReportComment);
    }
  } catch (err) {
    console.error(err);
  }
};

// signalement
const handleReportComment = async (commentId) => {
  if (!confirm('Signaler ce commentaire ?')) return;
  const result = await reportComment(commentId);
  if (result?.message === 'commentaire signalé') {
    const updatedComments = await getComments(gameId);
    renderComments(updatedComments, currentUser, handleDeleteComment, handleReportComment);
  } else {
    alert(result?.message || 'Erreur lors du signalement.');
  }
};

init();