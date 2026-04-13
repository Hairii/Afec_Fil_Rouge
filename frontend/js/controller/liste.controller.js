import { getGames } from '../api/game.api.js';
import { getGenres } from '../api/genre.api.js';
import { renderGames, renderPagination, renderGenres } from '../view/liste.view.js';

let currentPage = 1;
let currentSearch = '';
let currentGenres = [];
let currentSort = 'name-asc';

const gameList = document.getElementById('gameList');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortGames');
const checkboxContainer = document.getElementById('checkboxContainer');
const toggleGenresBtn = document.getElementById('toggleGenresBtn');

// ====== CHARGER ET AFFICHER LES JEUX ======
const loadGames = async () => {
  const result = await getGames(currentPage, currentSearch, currentGenres, currentSort);
  renderGames(gameList, result.games);
  renderPagination(currentPage, result.total, 20, async (page) => {
    currentPage = page;
    await loadGames();
  });
};

// ====== GENRES ======
const loadGenres = async () => {
  const genres = await getGenres();
  renderGenres(checkboxContainer, genres, (selected) => {
    currentGenres = selected;
    currentPage = 1;
    loadGames();
  });
};

// ====== TOGGLE GENRES ======
toggleGenresBtn?.addEventListener('click', () => {
  checkboxContainer.classList.toggle('hidden');
});

// ====== RECHERCHE ======
searchInput?.addEventListener('input', () => {
  currentSearch = searchInput.value;
  currentPage = 1;
  loadGames();
});

// ====== TRI ======
sortSelect?.addEventListener('change', () => {
  currentSort = sortSelect.value;
  currentPage = 1;
  loadGames();
});

loadGenres();
loadGames();