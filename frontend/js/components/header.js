import { getUser, logout, deleteAccount } from "../api/auth.api.js";

const html = `
    <header class="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-indigo-600/50 shadow-lg sticky top-0 z-50">
      <div class="max-w-7xl mx-auto flex justify-between items-center p-6">
        <a href="/index.html" class="text-3xl font-extrabold text-indigo-400">
          Game<span class="text-blue-400">Finder</span>
        </a>

        <!-- Burger mobile -->
        <button id="burgerBtn" aria-label="Ouvrir le menu de navigation" aria-expanded="false" aria-controls="mobileMenu" class="md:hidden text-white text-3xl hover:text-indigo-400 transition">☰</button>

        <!-- Desktop nav -->
        <nav class="hidden md:flex gap-3 items-center" aria-label="Navigation principale">
          <a href="/pages/liste_jeux.html" class="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-blue-500 transition shadow-md font-semibold">
            🎮 Liste des jeux
          </a>
          <div id="userSection"></div>
        </nav>
      </div>
    </header>

    <!-- Menu mobile -->
    <div id="mobileMenu" class="fixed top-0 right-0 h-full w-72 bg-gray-800 text-white shadow-2xl transform translate-x-full transition-transform duration-300 z-40 md:hidden" aria-label="Menu de navigation mobile" aria-hidden="true">
      <div class="p-6 flex flex-col gap-4 mt-20">
        <a href="/pages/liste_jeux.html" class="w-full text-center py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition">
          🎮 Liste des jeux
        </a>
        <div id="userSectionMobile"></div>
      </div>
    </div>

    <div id="overlay" class="fixed inset-0 bg-black/50 z-30 hidden md:hidden"></div>
  `;

document.body.insertAdjacentHTML("afterbegin", html);

// ====== BURGER ======
const burgerBtn = document.getElementById("burgerBtn");
const mobileMenu = document.getElementById("mobileMenu");
const overlay = document.getElementById("overlay");

burgerBtn?.addEventListener("click", () => {
  const isOpen = !mobileMenu.classList.contains("translate-x-full");
  mobileMenu.classList.toggle("translate-x-full");
  mobileMenu.setAttribute("aria-hidden", isOpen ? "true" : "false");
  overlay.classList.toggle("hidden");
  burgerBtn.setAttribute("aria-expanded", isOpen ? "false" : "true");
  burgerBtn.setAttribute("aria-label", isOpen ? "Ouvrir le menu de navigation" : "Fermer le menu de navigation");
});

overlay?.addEventListener("click", () => {
  mobileMenu.classList.add("translate-x-full");
  mobileMenu.setAttribute("aria-hidden", "true");
  overlay.classList.add("hidden");
  burgerBtn?.setAttribute("aria-expanded", "false");
  burgerBtn?.setAttribute("aria-label", "Ouvrir le menu de navigation");
});

// ====== HEADER DYNAMIQUE ======
const renderHeader = async () => {
  const desktop = document.getElementById("userSection");
  const mobile = document.getElementById("userSectionMobile");
  if (!desktop || !mobile) return;

  const user = await getUser();

  if (user && !user.message) {
    const desktopHtml = `
      <div class="flex items-center gap-3">
        <span class="text-white font-semibold">👋 ${user.username}</span>
        ${user.role === 'admin' ? `<a href="/pages/admin.html" class="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-500 transition">Admin</a>` : ''}
        <button id="logoutBtnDesktop" aria-label="Se déconnecter" class="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-500 transition">Déconnexion</button>
        ${user.role !== 'admin' ? `
        <button id="deleteAccountBtnDesktop" aria-label="Supprimer mon compte" class="ml-6 px-3 py-1 bg-transparent border border-gray-600 text-gray-400 rounded-full hover:border-red-500 hover:text-red-400 transition text-xs">
          Supprimer le compte
        </button>` : ''}
      </div>
    `;

    const mobileHtml = `
      <div class="flex flex-col gap-3 w-full">
        <span class="text-white font-semibold">👋 ${user.username}</span>
        ${user.role === 'admin' ? `<a href="/pages/admin.html" class="w-full text-center px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-500 transition">Admin</a>` : ''}
        <button id="logoutBtnMobile" aria-label="Se déconnecter" class="w-full px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-500 transition">Déconnexion</button>
        ${user.role !== 'admin' ? `
        <button id="deleteAccountBtnMobile" aria-label="Supprimer mon compte" class="w-full mt-2 px-3 py-1 bg-transparent border border-gray-600 text-gray-400 rounded-full hover:border-red-500 hover:text-red-400 transition text-xs">
          Supprimer le compte
        </button>` : ''}
      </div>
    `;

    desktop.innerHTML = desktopHtml;
    mobile.innerHTML = mobileHtml;

    // Déconnexion
    document.getElementById('logoutBtnDesktop')?.addEventListener('click', async () => {
      await logout();
      window.location.href = '/index.html';
    });
    document.getElementById('logoutBtnMobile')?.addEventListener('click', async () => {
      await logout();
      window.location.href = '/index.html';
    });

    // Suppression de compte
    const handleDeleteAccount = async () => {
      if (user.role === 'admin') {
        alert('Un administrateur ne peut pas supprimer son compte.');
        return;
      }
      if (!confirm('Supprimer votre compte ? Cette action est irréversible et vos données seront anonymisées.')) return;
      const result = await deleteAccount();
      if (result?.message === 'Compte supprimé') {
        window.location.href = '/index.html';
      } else {
        alert(result?.message || 'Erreur lors de la suppression du compte.');
      }
    };

    document.getElementById('deleteAccountBtnDesktop')?.addEventListener('click', handleDeleteAccount);
    document.getElementById('deleteAccountBtnMobile')?.addEventListener('click', handleDeleteAccount);

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