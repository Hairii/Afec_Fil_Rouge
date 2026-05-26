import { fetchWithRefresh } from './fetch.js';

const login = async (mail, password) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mail, password }),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const register = async (username, mail, password, confirmPassword) => {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, mail, password, confirmPassword }),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const logout = async () => {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const getUser = async () => {
  try {
    // si le token est expiré il le recréer
    const response = await fetchWithRefresh('/api/auth/user');
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export { login, register, logout, getUser };