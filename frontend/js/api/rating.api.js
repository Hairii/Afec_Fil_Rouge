import { fetchWithRefresh } from './fetch.js';

const getRatings = async (id) => {
  try {
    const response = await fetch(`/api/ratings/${id}`, {
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const addRating = async (id, rating) => {
  try {
    const response = await fetchWithRefresh('/api/ratings/add', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameID: id, rating }),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export { getRatings, addRating };