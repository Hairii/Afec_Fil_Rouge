const getGames = async (page = 1, search = '', genres = [], sort = '') => {
  try {
    const url = new URL('http://localhost:3000/api/games');
    url.searchParams.append('page', page); // pagination
    url.searchParams.append('search', search); // input recherche
    url.searchParams.append('sort', sort); // trie par alphabet ou note
    if (genres.length) url.searchParams.append('genres', genres.join(',')); // trie par genre

    const response = await fetch(url, { credentials: 'include' });
    const games = await response.json();
    return games;
  } catch (error) {
    console.error(error);
  }
};

const getGameById = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/games/${id}`, {
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export { getGames, getGameById };