import { getReportedComments, unreportComment, deleteComment } from '../api/admin.api.js';
import { getUser } from '../api/auth.api.js';

const init = async () => {
  const user = await getUser();
  if (!user || user.role !== 'admin') {
    window.location.href = '/index.html';
    return;
  }

  loadComments();
};

const loadComments = async () => {
  const comments = await getReportedComments();

  document.getElementById('loadingMsg').classList.add('hidden');

  if (!comments || comments.message) {
    document.getElementById('globalMessage').textContent = 'Erreur de chargement.';
    return;
  }

  renderComments(comments);
};

const renderComments = (comments) => {
  const list = document.getElementById('commentsList');
  const emptyMsg = document.getElementById('emptyMsg');
  list.innerHTML = '';

  if (!comments.length) {
    emptyMsg.classList.remove('hidden');
    return;
  }

  emptyMsg.classList.add('hidden');

  comments.forEach((comment) => {
    const card = document.createElement('div');
    card.className = 'bg-gray-900/70 backdrop-blur-md rounded-2xl border border-red-500/30 shadow-xl p-5 flex flex-col gap-3';
    card.innerHTML = `
      <div class="flex justify-between items-start gap-4 flex-wrap">
        <div class="flex flex-col gap-1">
          <span class="text-indigo-300 font-semibold text-sm">${escapeHTML(comment.username || 'Anonyme')}</span>
          <span class="text-gray-500 text-xs">${formatDate(comment.created_at)}</span>
          ${comment.game_id ? `<span class="text-gray-500 text-xs">Jeu #${comment.game_id}</span>` : ''}
        </div>
        <span class="px-2 py-1 bg-red-600/20 text-red-400 border border-red-500/30 rounded-full text-xs font-semibold">
          🚩 Signalé
        </span>
      </div>

      <p class="text-gray-200 text-sm leading-relaxed bg-gray-800/50 rounded-xl p-3">
        ${escapeHTML(comment.content)}
      </p>

      <div class="flex gap-3 justify-end">
        <button data-id="${comment.id}" class="unreport-btn px-4 py-1.5 bg-green-600 text-white rounded-xl hover:bg-green-500 transition text-xs font-semibold">
          ✅ Désignaler
        </button>
        <button data-id="${comment.id}" class="delete-btn px-4 py-1.5 bg-red-600 text-white rounded-xl hover:bg-red-500 transition text-xs font-semibold">
          🗑 Supprimer
        </button>
      </div>
    `;

    card.querySelector('.unreport-btn').addEventListener('click', () => handleUnreport(comment.id));
    card.querySelector('.delete-btn').addEventListener('click', () => handleDelete(comment.id));

    list.appendChild(card);
  });
};

const handleUnreport = async (id) => {
  const result = await unreportComment(id);
  const msg = document.getElementById('globalMessage');

  if (result?.message === 'commentaire désignalé') {
    msg.textContent = 'Commentaire désignalé.';
    msg.className = 'text-sm text-green-400';
    loadComments();
  } else {
    msg.textContent = result?.message || 'Erreur lors du désignalement.';
    msg.className = 'text-sm text-red-400';
  }
};

const handleDelete = async (id) => {
  if (!confirm('Supprimer définitivement ce commentaire ?')) return;

  const result = await deleteComment(id);
  const msg = document.getElementById('globalMessage');

  if (result?.message === 'commentaire supprimé') {
    msg.textContent = 'Commentaire supprimé.';
    msg.className = 'text-sm text-green-400';
    loadComments();
  } else {
    msg.textContent = result?.message || 'Erreur lors de la suppression.';
    msg.className = 'text-sm text-red-400';
  }
};

const escapeHTML = (str) =>
  String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
};

init();