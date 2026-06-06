export const renderGames = (container, games) => {
  if (!container) return;
  container.innerHTML = '';

  if (!games || !games.length) {
    container.innerHTML = `<p class="text-white text-lg">Aucun jeu trouvé.</p>`;
    return;
  }

  games.forEach(game => {
    const card = document.createElement('a');
    card.href = `./detail.html?id=${game.id}`;
    card.setAttribute('aria-label', `Voir le détail de ${game.name}`);
    card.className = `
      bg-gray-900/50 border border-indigo-600/40 rounded-xl overflow-hidden
      w-64 shadow-lg transform transition duration-300
      hover:scale-105 hover:shadow-[0_0_25px_rgba(99,102,241,0.7)]
      focus:outline-none focus:ring-2 focus:ring-indigo-400
    `;
    card.innerHTML = `
      <div class="w-full h-40">
        <img src="${game.img || '../public/image/placeholder.png'}" alt="${game.name}"
             class="w-full h-full object-cover"
             onerror="this.src='../public/image/placeholder.png'">
      </div>
      <div class="p-4 flex flex-col gap-2">
        <h3 class="text-lg font-extrabold text-cyan-100">${game.name}</h3>
        <div class="flex flex-wrap gap-1" aria-label="Genres">
          ${(game.genres || []).map(g => `<span class="text-xs px-2 py-1 border border-[#a200ff] text-white rounded-full">${g}</span>`).join('')}
        </div>
        <p class="text-gray-200 text-sm font-semibold">Metacritic : ${game.metacritic || 'N/A'}</p>
      </div>
    `;

    container.appendChild(card);
  });
};

// ====== PAGINATION ======
export const renderPagination = (currentPage, total, itemsPerPage, onPageChange) => {
  const pagination = document.getElementById('pagination');
  if (!pagination) return;
  pagination.innerHTML = '';

  const totalPages = Math.ceil(total / itemsPerPage);

  const prevBtn = document.createElement('button');
  prevBtn.textContent = '← Précédent';
  prevBtn.disabled = currentPage === 1;
  prevBtn.setAttribute('aria-label', 'Page précédente');
  prevBtn.className = 'px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 transition disabled:opacity-50';
  prevBtn.addEventListener('click', () => onPageChange(currentPage - 1));
  pagination.appendChild(prevBtn);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.setAttribute('aria-label', `Page ${i}`);
    btn.setAttribute('aria-current', i === currentPage ? 'page' : 'false');
    btn.className = i === currentPage
      ? 'px-3 py-2 rounded bg-indigo-600 text-white'
      : 'px-3 py-2 rounded bg-gray-700 text-white hover:bg-gray-600';
    btn.addEventListener('click', () => onPageChange(i));
    pagination.appendChild(btn);
  }

  const nextBtn = document.createElement('button');
  nextBtn.textContent = 'Suivant →';
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.setAttribute('aria-label', 'Page suivante');
  nextBtn.className = 'px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 transition disabled:opacity-50';
  nextBtn.addEventListener('click', () => onPageChange(currentPage + 1));
  pagination.appendChild(nextBtn);
};

// ====== GENRES ======
export const renderGenres = (container, genres, onChange) => {
  if (!container) return;
  container.innerHTML = '';

  genres.forEach(genre => {
    const label = document.createElement('label');
    label.className = 'flex items-center gap-1 px-3 py-1 border border-[#a200ff] text-white rounded-full cursor-pointer hover:bg-gray-700';
    label.innerHTML = `<input type="checkbox" value="${genre.name}" class="genre-checkbox" aria-label="Filtrer par ${genre.name}"> ${genre.name}`;
    container.appendChild(label);
  });

  container.addEventListener('change', () => {
    const selected = [...container.querySelectorAll('.genre-checkbox:checked')].map(cb => cb.value);
    onChange(selected);
  });
};