import { getUser, logout } from '../api/auth.api.js';


  const html = `
    <header class="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-indigo-600/50 shadow-lg sticky top-0 z-50">
      <div class="max-w-7xl mx-auto flex justify-between items-center p-6">
        <a href="/index.html" class="text-3xl font-extrabold text-indigo-400">
          Game<span class="text-blue-400">Finder</span>
        </a>

        <!-- Burger mobile -->
        <button id="burgerBtn" class="md:hidden text-white text-3xl hover:text-indigo-400 transition">☰</button>

        <!-- Desktop nav -->
        <nav class="hidden md:flex gap-3 items-center">
          <a href="/pages/liste_jeux.html" class="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-blue-500 transition shadow-md font-semibold">
            🎮 Liste des jeux
          </a>
          <div id="userSection"></div>
        </nav>
      </div>
    </header>

    <!-- Menu mobile -->
    <div id="mobileMenu" class="fixed top-0 right-0 h-full w-72 bg-gray-800 text-white shadow-2xl transform translate-x-full transition-transform duration-300 z-40 md:hidden">
      <div class="p-6 flex flex-col gap-4 mt-20">
        <a href="/pages/liste_jeux.html" class="w-full text-center py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition">
          🎮 Liste des jeux
        </a>
        <div id="userSectionMobile"></div>
      </div>
    </div>

    <div id="overlay" class="fixed inset-0 bg-black/50 z-30 hidden md:hidden"></div>
  `;

  document.body.insertAdjacentHTML('afterbegin', html);

  // ====== BURGER ======
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('overlay');

  burgerBtn?.addEventListener('click', () => {
    mobileMenu.classList.toggle('translate-x-full');
    overlay.classList.toggle('hidden');
  });

  overlay?.addEventListener('click', () => {
    mobileMenu.classList.add('translate-x-full');
    overlay.classList.add('hidden');
  });

  // ====== HEADER DYNAMIQUE ======
  const renderHeader = async () => {
    const desktop = document.getElementById('userSection');
    const mobile = document.getElementById('userSectionMobile');
    if (!desktop || !mobile) return;

    const user = await getUser();

    if (user && !user.message) {
      const html = `
        <div class="flex items-center gap-3">
          <span class="text-white font-semibold">👋 ${user.username}</span>
          ${user.role === 'admin' ? `<a href="/pages/admin.html" class="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-500 transition">Admin</a>` : ''}
          <button id="logoutBtn" class="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-500 transition">Déconnexion</button>
        </div>
      `;
      desktop.innerHTML = html;
      mobile.innerHTML = html;

      document.querySelectorAll('#logoutBtn').forEach(btn => {
        btn.addEventListener('click', async () => {
          await logout();
          window.location.href = '/index.html';
        });
      });
    } else {
      const html = `
        <a href="/pages/login.html" class="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition shadow-md font-semibold">
          👤 Connexion
        </a>
      `;
      desktop.innerHTML = html;
      mobile.innerHTML = html;
    }
  };

  renderHeader();
