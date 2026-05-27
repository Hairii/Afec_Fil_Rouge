import { fetchWithRefresh } from './fetch.js';

export const getAdminGames = async () => {
  try {
    const response = await fetchWithRefresh('/api/admin/games');
    return await response.json();
  } catch (error) { console.error(error); }
};

export const createGame = async (fields) => {
  try {
    const response = await fetchWithRefresh('/api/admin/games', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
    });
    return await response.json();
  } catch (error) { console.error(error); }
};

export const deleteGame = async (id) => {
  try {
    const response = await fetchWithRefresh(`/api/admin/games/${id}`, { method: 'DELETE' });
    return await response.json();
  } catch (error) { console.error(error); }
};

export const updateGame = async (id, fields) => {
  try {
    const response = await fetchWithRefresh(`/api/admin/games/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
    });
    return await response.json();
  } catch (error) { console.error(error); }
};

export const getReportedComments = async () => {
  try {
    const response = await fetchWithRefresh('/api/admin/comments');
    return await response.json();
  } catch (error) { console.error(error); }
};

export const unreportComment = async (id) => {
  try {
    const response = await fetchWithRefresh(`/api/admin/comments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    });
    return await response.json();
  } catch (error) { console.error(error); }
};

export const deleteComment = async (id) => {
  try {
    const response = await fetchWithRefresh(`/api/admin/comments/${id}`, { method: 'DELETE' });
    return await response.json();
  } catch (error) { console.error(error); }
};

export const deleteUser = async (id) => {
  try {
    const response = await fetchWithRefresh(`/api/admin/users/${id}`, { method: 'DELETE' });
    return await response.json();
  } catch (error) { console.error(error); }
};