const getComments = async (id) => {
  try {
    const response = await fetch(`/api/comments/${id}`, {
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const addComments = async (id, comment) => {
  try {
    const response = await fetch('/api/comments/add', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameID: id, content: comment }),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const reportComment = async (id) => {
  try {
    const response = await fetch(`/api/comments/report/${id}`, {
      method: 'PATCH',
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export { getComments, addComments, reportComment };