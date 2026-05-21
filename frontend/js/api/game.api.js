const getGames = async (page = 1, search = '', genres = [], sort = '') => {
  try {
    const url = new URL('/api/games', window.location.origin);
    url.searchParams.append('page', page);
    url.searchParams.append('search', search);
    url.searchParams.append('sort', sort);
    if (genres.length) url.searchParams.append('genres', genres.join(','));

    const response = await fetch(url, { credentials: 'include' });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const getGameById = async (id) => {
  try {
    const response = await fetch(`/api/games/${id}`, {
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export { getGames, getGameById };