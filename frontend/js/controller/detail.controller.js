import { getGameById } from '../api/game.api.js';
import { getComments, addComments } from '../api/comment.api.js';
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

const init = async () => {
  if (!gameId) {
    renderError();
    return;
  }

  // Chargement parallèle : jeu + note + commentaires + user
  const [game, ratingData, comments, user] = await Promise.all([
    getGameById(gameId),
    getRatings(gameId),
    getComments(gameId),
    getUser(),
  ]);


  if (!game || game.message) {
    renderError();
    return;
  }

  renderGame(game);

  renderRating(ratingData);

  const isConnected = user && !user.message;

  if (isConnected) {
    selectedRating = ratingData?.userRating || null;
    renderRatingForm((note) => {
      selectedRating = note;
    }, ratingData?.userRating || null);
  } else {
    renderRatingGuest();
  }

  if (isConnected) {
    renderCommentForm();
  } else {
    renderCommentGuest();
  }

  renderComments(comments, user, handleDeleteComment);

  // envoi de la note 
  document.getElementById('submitRating')?.addEventListener('click', async () => {
    if (!selectedRating) {
      renderRatingMessage('Sélectionnez une note avant d\'envoyer.', true);
      return;
    }

    const result = await addRating(gameId, selectedRating);

    if (result && !result.message?.includes('erreur')) {
      renderRatingMessage('Note envoyée ! Merci 🎮');
      // Rafraîchir la note moyenne
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

    if (result && !result.message?.includes('erreur')) {
      renderCommentMessage('Commentaire publié !');
      input.value = '';
      const updatedComments = await getComments(gameId);
      renderComments(updatedComments, user, handleDeleteComment);
    } else {
      renderCommentMessage(result?.message || 'Erreur lors de la publication.', true);
    }
  });
};

// supp commentaire
const handleDeleteComment = async (commentId) => {
  if (!confirm('Supprimer ce commentaire ?')) return;

  try {
    const response = await fetch(`http://localhost:3000/api/comments/delete/${commentId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    const result = await response.json();

    if (response.ok) {
      const [updatedComments, user] = await Promise.all([
        getComments(gameId),
        getUser(),
      ]);
      renderComments(updatedComments, user, handleDeleteComment);
    } else {
      alert(result?.message || 'Erreur lors de la suppression.');
    }
  } catch (err) {
    console.error(err);
    alert('Erreur réseau.');
  }
};

init();