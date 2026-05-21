const getGenres = async () => {
  try {
    const response = await fetch('/api/genres', {
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export { getGenres };