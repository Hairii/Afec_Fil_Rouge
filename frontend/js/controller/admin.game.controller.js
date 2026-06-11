import { getAdminGames, createGame, deleteGame, updateGame } from '../api/admin.api.js';
import { getUser } from '../api/auth.api.js';

let allGames = [];
let editingId = null;

const init = async () => {
  const user = await getUser();
  if (!user || user.role !== 'admin') {
    window.location.href = '/index.html';
    return;
  }

  const games = await getAdminGames();
  if (!games || games.message) {
    document.getElementById('loadingMsg').textContent = 'Erreur de chargement.';
    return;
  }

  allGames = games;
  document.getElementById('loadingMsg').classList.add('hidden');
  renderTable(allGames);

  document.getElementById('searchInput').addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    renderTable(allGames.filter((g) => g.name.toLowerCase().includes(q)));
  });

  // modal ajout
  document.getElementById('openAddModal').addEventListener('click', openAddModal);
  document.getElementById('cancelAdd').addEventListener('click', closeAddModal);
  document.getElementById('confirmAdd').addEventListener('click', handleAdd);
  document.getElementById('addModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('addModal')) closeAddModal();
  });

  // modal modifier
  document.getElementById('cancelEdit').addEventListener('click', closeEditModal);
  document.getElementById('confirmEdit').addEventListener('click', handleEdit);
  document.getElementById('editModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('editModal')) closeEditModal();
  });
};

const renderTable = (games) => {
  const tbody = document.getElementById('gamesTableBody');
  const emptyMsg = document.getElementById('emptyMsg');
  tbody.innerHTML = '';

  if (!games.length) {
    emptyMsg.classList.remove('hidden');
    return;
  }
  emptyMsg.classList.add('hidden');

  games.forEach((game) => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-indigo-600/5 transition';
    tr.innerHTML = `
      <td class="px-4 py-3">
        <img src="${game.img || '../public/image/placeholder.png'}"
             onerror="this.src='../public/image/placeholder.png'"
             alt="${escapeHTML(game.name)}"
             class="w-14 h-10 object-cover rounded-lg" />
      </td>
      <td class="px-4 py-3 font-semibold text-white max-w-[180px] truncate">${escapeHTML(game.name)}</td>
      <td class="px-4 py-3 text-gray-400">${game.released ? new Date(game.released).toLocaleDateString('fr-FR') : '—'}</td>
      <td class="px-4 py-3 text-gray-400">${game.metacritic ?? '—'}</td>
      <td class="px-4 py-3 text-gray-400 max-w-[150px] truncate">${game.genres.join(', ') || '—'}</td>
      <td class="px-4 py-3">
        <div class="flex gap-2 justify-center">
          <button data-id="${game.id}" data-name="${escapeHTML(game.name)}" data-released="${game.released || ''}" data-metacritic="${game.metacritic || ''}" data-img="${game.img || ''}"
            aria-label="Modifier ${escapeHTML(game.name)}"
            class="cursor-pointer edit-btn px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-blue-500 transition text-xs">Modifier</button>
          <button data-id="${game.id}" data-name="${escapeHTML(game.name)}"
            aria-label="Supprimer ${escapeHTML(game.name)}"
            class="cursor-pointer delete-btn px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-500 transition text-xs">Supprimer</button>
        </div>
      </td>
    `;

    tr.querySelector('.edit-btn').addEventListener('click', (e) => {
      const b = e.currentTarget;
      openEditModal(b.dataset.id, b.dataset.name, b.dataset.released, b.dataset.metacritic, b.dataset.img);
    });
    tr.querySelector('.delete-btn').addEventListener('click', (e) => {
      const b = e.currentTarget;
      handleDelete(b.dataset.id, b.dataset.name);
    });

    tbody.appendChild(tr);
  });
};

const openAddModal = () => {
  document.getElementById('addName').value = '';
  document.getElementById('addDescription').value = '';
  document.getElementById('addReleased').value = '';
  document.getElementById('addMetacritic').value = '';
  document.getElementById('addEsrb').value = '';
  document.getElementById('addImg').value = '';
  document.getElementById('addGenres').value = '';
  document.getElementById('addMessage').textContent = '';
  document.getElementById('addModal').classList.remove('hidden');
};

const closeAddModal = () => document.getElementById('addModal').classList.add('hidden');

const handleAdd = async () => {
  const name = document.getElementById('addName').value.trim();
  const msg = document.getElementById('addMessage');

  if (!name) {
    msg.textContent = 'Le nom est obligatoire.';
    msg.className = 'text-sm text-red-400';
    return;
  }

  const fields = {
    name,
    description: document.getElementById('addDescription').value.trim() || undefined,
    released: document.getElementById('addReleased').value || undefined,
    metacritic: document.getElementById('addMetacritic').value ? parseInt(document.getElementById('addMetacritic').value) : undefined,
    esrb_rating: document.getElementById('addEsrb').value || undefined,
    img: document.getElementById('addImg').value.trim() || undefined,
    genres: document.getElementById('addGenres').value
      ? document.getElementById('addGenres').value.split(',').map((g) => g.trim()).filter(Boolean)
      : [],
  };

  const result = await createGame(fields);

  if (result?.message === 'jeu créé') {
    msg.textContent = 'Jeu ajouté !';
    msg.className = 'text-sm text-green-400';
    const games = await getAdminGames();
    allGames = games;
    renderTable(allGames);
    setTimeout(closeAddModal, 800);
  } else {
    msg.textContent = result?.message || 'Erreur lors de l\'ajout.';
    msg.className = 'text-sm text-red-400';
  }
};

const openEditModal = (id, name, released, metacritic, img) => {
  editingId = id;
  document.getElementById('editGameName').textContent = name;
  document.getElementById('editName').value = '';
  document.getElementById('editReleased').value = released ? released.split('T')[0] : '';
  document.getElementById('editMetacritic').value = metacritic || '';
  document.getElementById('editImg').value = '';
  document.getElementById('editMessage').textContent = '';
  document.getElementById('editModal').classList.remove('hidden');
};

const closeEditModal = () => {
  editingId = null;
  document.getElementById('editModal').classList.add('hidden');
};

const handleEdit = async () => {
  const fields = {};
  const name = document.getElementById('editName').value.trim();
  const released = document.getElementById('editReleased').value;
  const metacritic = document.getElementById('editMetacritic').value.trim();
  const img = document.getElementById('editImg').value.trim();

  if (name) fields.name = name;
  if (released) fields.released = released;
  if (metacritic) fields.metacritic = parseInt(metacritic);
  if (img) fields.img = img;

  if (!Object.keys(fields).length) {
    showEditMessage('Modifiez au moins un champ.', true);
    return;
  }

  const result = await updateGame(editingId, fields);

  if (result?.message === 'jeu mis à jour') {
    showEditMessage('Jeu mis à jour !');
    const games = await getAdminGames();
    allGames = games;
    renderTable(allGames);
    setTimeout(closeEditModal, 800);
  } else {
    showEditMessage(result?.message || 'Erreur lors de la mise à jour.', true);
  }
};

const showEditMessage = (msg, isError = false) => {
  const el = document.getElementById('editMessage');
  el.textContent = msg;
  el.className = `text-sm ${isError ? 'text-red-400' : 'text-green-400'}`;
};

// supp
const handleDelete = async (id, name) => {
  if (!confirm(`Supprimer "${name}" ? Cette action est irréversible.`)) return;

  const result = await deleteGame(id);
  const msg = document.getElementById('globalMessage');

  if (result?.message === 'jeu supprimé') {
    allGames = allGames.filter((g) => String(g.id) !== String(id));
    renderTable(allGames);
    msg.textContent = `"${name}" supprimé.`;
    msg.className = 'text-sm text-green-400';
  } else {
    msg.textContent = result?.message || 'Erreur lors de la suppression.';
    msg.className = 'text-sm text-red-400';
  }
};

const escapeHTML = (str) =>
  String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

init();