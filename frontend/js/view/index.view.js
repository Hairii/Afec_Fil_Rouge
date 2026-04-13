export const renderCarousel = (container, games, showDate = false) => {
  if (!container) return;
  container.innerHTML = '';

  if (!games || !games.length) {
    container.innerHTML = `<p class="text-white">Aucun jeu trouvé.</p>`;
    return;
  }
  games.forEach(game => {
    const card = document.createElement('div');
    card.className = `
      relative bg-gray-900/50 border border-indigo-600/40 rounded-xl overflow-hidden
      w-64 shrink-0 cursor-pointer shadow-lg transform transition duration-300
      hover:scale-105 hover:shadow-[0_0_25px_rgba(99,102,241,0.7)]
    `;
    card.innerHTML = `
      <div class="relative w-full h-40">
        <img src="${game.img || '/image/placeholder.png'}" alt="${game.name}" 
             class="w-full h-full object-cover"
             onerror="this.src='/image/placeholder.png'">
      </div>
      <div class="p-4 flex flex-col gap-2">
        <h3 class="text-lg font-extrabold text-cyan-100">${game.name}</h3>
        <div class="flex flex-wrap gap-1">
         ${(game.genres || []).map(g => `<span class="text-xs px-2 py-1 border border-[#a200ff] text-white rounded-full">${g}</span>`).join('')}
        </div>
        ${showDate 
  ? `<p class="text-gray-200 text-sm font-semibold">Sortie : ${game.released ? new Date(game.released).toLocaleDateString('fr-FR') : 'N/A'}</p>`
  : `<p class="text-gray-200 text-sm font-semibold">Metacritic : ${game.metacritic || 'N/A'}</p>`
}
      </div>
    `;

    card.addEventListener('click', () => {
      window.location.href = `/pages/detail.html?id=${game.id}`;
    });

    container.appendChild(card);
  });
};