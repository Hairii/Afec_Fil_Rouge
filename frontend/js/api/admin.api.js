const getAdminGames = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/admin/games', {
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const deleteGame = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/admin/games/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

// PATCH — envoie uniquement les champs modifiés
const updateGame = async (id, fields) => {
  try {
    const response = await fetch(`http://localhost:3000/api/admin/games/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const getReportedComments = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/admin/comments', {
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const unreportComment = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/admin/comments/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const deleteComment = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/admin/comments/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const deleteUser = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/admin/users/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export { getAdminGames, deleteGame, updateGame, getReportedComments, unreportComment, deleteComment, deleteUser };