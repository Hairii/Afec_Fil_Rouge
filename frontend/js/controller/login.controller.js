import { login, register } from '../api/auth.api.js';

// toggle
const tabLogin = document.getElementById('tabLogin');
const tabRegister = document.getElementById('tabRegister');
const formLogin = document.getElementById('formLogin');
const formRegister = document.getElementById('formRegister');

const showLogin = () => {
  formLogin.classList.remove('hidden');
  formRegister.classList.add('hidden');
  tabLogin.classList.add('bg-indigo-600', 'text-white');
  tabLogin.classList.remove('bg-transparent', 'text-gray-400');
  tabRegister.classList.remove('bg-indigo-600', 'text-white');
  tabRegister.classList.add('bg-transparent', 'text-gray-400');
};

const showRegister = () => {
  formRegister.classList.remove('hidden');
  formLogin.classList.add('hidden');
  tabRegister.classList.add('bg-indigo-600', 'text-white');
  tabRegister.classList.remove('bg-transparent', 'text-gray-400');
  tabLogin.classList.remove('bg-indigo-600', 'text-white');
  tabLogin.classList.add('bg-transparent', 'text-gray-400');
};

tabLogin.addEventListener('click', showLogin);
tabRegister.addEventListener('click', showRegister);

// connexion
document.getElementById('submitLogin').addEventListener('click', async () => {
  const mail = document.getElementById('loginMail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();
  const msg = document.getElementById('loginMessage');

  if (!mail || !password) {
    msg.textContent = 'Veuillez remplir tous les champs.';
    msg.className = 'text-sm text-center text-red-400';
    return;
  }

  const result = await login(mail, password);

  if (result?.message === 'Connexion réussie') {
    msg.textContent = 'Connexion réussie, redirection...';
    msg.className = 'text-sm text-center text-green-400';
    setTimeout(() => {
      window.location.href = '/index.html';
    }, 800);
  } else {
    msg.textContent = result?.message || result?.error || 'Email ou mot de passe incorrect.';
    msg.className = 'text-sm text-center text-red-400';
  }
});

// inscription
document.getElementById('submitRegister').addEventListener('click', async () => {
  const username = document.getElementById('registerUsername').value.trim();
  const mail = document.getElementById('registerMail').value.trim();
  const password = document.getElementById('registerPassword').value.trim();
  const confirmPassword = document.getElementById('registerConfirmPassword').value.trim();
  const msg = document.getElementById('registerMessage');

  if (!username || !mail || !password || !confirmPassword) {
    msg.textContent = 'Veuillez remplir tous les champs.';
    msg.className = 'text-sm text-center text-red-400';
    return;
  }

  if (password !== confirmPassword) {
    msg.textContent = 'Les mots de passe ne correspondent pas.';
    msg.className = 'text-sm text-center text-red-400';
    return;
  }

  const result = await register(username, mail, password, confirmPassword);

  if (result?.message === 'user créé') {
    msg.textContent = 'Compte créé ! Vous pouvez vous connecter.';
    msg.className = 'text-sm text-center text-green-400';
    setTimeout(() => showLogin(), 1200);
  } else {
    msg.textContent = result?.message || result?.error || 'Erreur lors de l\'inscription.';
    msg.className = 'text-sm text-center text-red-400';
  }
});