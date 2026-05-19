const renderGame = (game) => {
  document.title = `${game.name} - GameFinder`;

  document.getElementById('gameImage').src = game.img || '../public/image/placeholder.png';
  document.getElementById('gameImage').alt = game.name;
  document.getElementById('gameName').textContent = game.name;
  document.getElementById('gameRelease').textContent = game.released
    ? `Date de sortie : ${new Date(game.released).toLocaleDateString('fr-FR')}`
    : '';
  document.getElementById('gameDescription').textContent = game.description || '';

  const genresEl = document.getElementById('gameGenres');
  genresEl.innerHTML = '';
  if (game.genres && game.genres.length) {
    game.genres.forEach((g) => {
      const badge = document.createElement('span');
      badge.className = 'px-3 py-1 bg-indigo-600/40 text-indigo-300 rounded-full text-xs font-semibold border border-indigo-500/30';
      badge.textContent = typeof g === 'string' ? g : g.name;
      genresEl.appendChild(badge);
    });
  }


  document.getElementById('loadingBlock').classList.add('hidden');
  document.getElementById('gameDetail').classList.remove('hidden');
};


const renderRating = (ratingData) => {
  const avg = ratingData?.average_rating;
  const count = ratingData?.count ?? 0;

  document.getElementById('avgRating').textContent = avg ? parseFloat(avg).toFixed(1) : '--';
  document.getElementById('ratingCount').textContent = count
    ? `(${count} note${count > 1 ? 's' : ''})`
    : '(aucune note)';
};


const renderRatingForm = (onStarClick) => {
  document.getElementById('ratingGuest').classList.add('hidden');
  document.getElementById('ratingForm').classList.remove('hidden');

  const container = document.getElementById('starContainer');
  container.innerHTML = '';

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('button');
    star.type = 'button';
    star.dataset.value = i;
    star.textContent = '☆';
    star.className = 'text-3xl text-gray-500 hover:text-yellow-400 transition star-btn cursor-pointer';
    star.addEventListener('click', () => {
      container.querySelectorAll('.star-btn').forEach((s) => {
        const v = parseInt(s.dataset.value);
        s.textContent = v <= i ? '★' : '☆';
        s.classList.toggle('text-yellow-400', v <= i);
        s.classList.toggle('text-gray-500', v > i);
      });
      onStarClick(i);
    });
    container.appendChild(star);
  }
};


const renderRatingGuest = () => {
  document.getElementById('ratingGuest').classList.remove('hidden');
  document.getElementById('ratingForm').classList.add('hidden');
};


const renderRatingMessage = (msg, isError = false) => {
  const el = document.getElementById('ratingMessage');
  el.textContent = msg;
  el.className = `text-sm mt-1 ${isError ? 'text-red-400' : 'text-green-400'}`;
};


const renderComments = (comments, user, onDelete) => {
  const list = document.getElementById('commentsList');
  const noComments = document.getElementById('noComments');
  list.innerHTML = '';

  if (!comments || comments.length === 0) {
    noComments.classList.remove('hidden');
    return;
  }

  noComments.classList.add('hidden');

  comments.forEach((comment) => {
    const card = document.createElement('div');
    card.className = 'bg-gray-800/60 rounded-xl p-4 border border-gray-700/40 flex flex-col gap-2';
    card.innerHTML = `
      <div class="flex justify-between items-start gap-2">
        <div>
          <span class="text-indigo-300 font-semibold text-sm">${escapeHTML(comment.username || 'Anonyme')}</span>
          <span class="text-gray-500 text-xs ml-2">${formatDate(comment.created_at)}</span>
        </div>
        ${user?.role === 'admin'
          ? `<button data-id="${comment.id}" class="delete-comment-btn text-red-500 hover:text-red-400 text-xs transition">Supprimer</button>`
          : ''}
      </div>
      <p class="text-gray-200 text-sm leading-relaxed">${escapeHTML(comment.content)}</p>
    `;

    if (user?.role === 'admin') {
      card.querySelector('.delete-comment-btn').addEventListener('click', () => {
        onDelete(comment.id);
      });
    }

    list.appendChild(card);
  });
};


const renderCommentForm = () => {
  document.getElementById('commentGuest').classList.add('hidden');
  document.getElementById('commentFormSection').classList.remove('hidden');
};


const renderCommentGuest = () => {
  document.getElementById('commentGuest').classList.remove('hidden');
  document.getElementById('commentFormSection').classList.add('hidden');
};


const renderCommentMessage = (msg, isError = false) => {
  const el = document.getElementById('commentMessage');
  el.textContent = msg;
  el.className = `text-sm ${isError ? 'text-red-400' : 'text-green-400'}`;
};


const renderError = () => {
  document.getElementById('loadingBlock').classList.add('hidden');
  document.getElementById('errorBlock').classList.remove('hidden');
};


const escapeHTML = (str) =>
  String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
};

export {
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
};