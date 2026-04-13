import { getUser, logout } from '../api/auth.api.js';

// ====== MENU BURGER ======
const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const overlay = document.getElementById('overlay');

if (burgerBtn && mobileMenu && overlay) {
  burgerBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('translate-x-full');
    overlay.classList.toggle('hidden');
  });

  overlay.addEventListener('click', () => {
    mobileMenu.classList.add('translate-x-full');
    overlay.classList.add('hidden');
  });
}

// ====== HEADER DYNAMIQUE ======
const renderHeader = async () => {
  const desktop = document.getElementById('userSection');
  const mobile = document.getElementById('userSectionMobile');
  if (!desktop || !mobile) return;

  const user = await getUser();

  if (user && !user.message) {
    // connecté
    const html = `
      <span class="text-white">👋 ${user.username}</span>
      ${user.role === 'admin' ? '<a href="/pages/admin.html">Dashboard Admin</a>' : ''}
      <button id="logoutBtn">Déconnexion</button>
    `;
    desktop.innerHTML = html;
    mobile.innerHTML = html;

    // bouton déconnexion
    document.querySelectorAll('#logoutBtn').forEach(btn => {
      btn.addEventListener('click', async () => {
        await logout();
        window.location.href = '/index.html';
      });
    });
  } else {
    // non connecté
    const html = `<a href="/pages/login.html">Connexion</a>`;
    desktop.innerHTML = html;
    mobile.innerHTML = html;
  }
};

renderHeader();