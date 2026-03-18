const deleteGame = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/admin/games/${id}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      },
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const updateGame = async (id, name, released) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/admin/games/${id}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, released }),
      },
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const getReportedComments = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/admin/comments", {
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const unreportComment = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/admin/comments/${id}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      },
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const deleteComment = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/admin/comments/${id}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      },
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const deleteUser = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/admin/users/${id}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      },
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export {
  deleteGame,
  updateGame,
  getReportedComments,
  unreportComment,
  deleteComment,
  deleteUser,
};
