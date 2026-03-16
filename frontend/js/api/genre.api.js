const getGenres = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/genres`, {
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export default getGenres;