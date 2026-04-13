import db from '../config/db.js';

export const getGames = async ({ page = 1, search = '', genres = [], sort = '' } = {}) => {
  try {
    const itemsPerPage = 20;
    const offset = (page - 1) * itemsPerPage;
    const params = [`%${search}%`];

    let baseSql = `
      FROM games g
      LEFT JOIN game_genres gg ON g.id = gg.game_id
      LEFT JOIN genres ge ON gg.genre_id = ge.id
      WHERE g.name LIKE ?
    `;

    if (genres.length) {
      baseSql += ` AND g.id IN (
        SELECT game_id FROM game_genres gg2
        JOIN genres ge2 ON gg2.genre_id = ge2.id
        WHERE ge2.name IN (${genres.map(() => '?').join(',')})
        GROUP BY game_id
        HAVING COUNT(DISTINCT ge2.name) = ?
      )`;
      params.push(...genres, genres.length);
    }

    const [countResult] = await db.query(
      `SELECT COUNT(DISTINCT g.id) as total ${baseSql}`, params
    );
    const total = countResult[0].total;

    let dataSql = `SELECT g.*, GROUP_CONCAT(ge.name) AS genre_names ${baseSql} GROUP BY g.id`;

    if (sort === 'name-asc') dataSql += ' ORDER BY g.name ASC';
    else if (sort === 'name-desc') dataSql += ' ORDER BY g.name DESC';
    else if (sort === 'rating-asc') dataSql += ' ORDER BY g.metacritic ASC';
    else if (sort === 'rating-desc') dataSql += ' ORDER BY g.metacritic DESC';
    else dataSql += ' ORDER BY g.released DESC';

    dataSql += ` LIMIT ${itemsPerPage} OFFSET ${offset}`;

    const [games] = await db.query(dataSql, params);

    const formatted = games.map(g => ({
      id: g.id,
      name: g.name,
      description: g.description,
      released: g.released,
      metacritic: g.metacritic,
      esrb: g.esrb_rating,
      img: g.img,
      genres: g.genre_names ? g.genre_names.split(',') : [],
    }));

    return { games: formatted, total };
  } catch (error) {
    console.error('erreur server (getGames)', error.message);
    throw error;
  }
};

export const getGameById = async (id) => {
  try {
    const [game] = await db.query(
      `SELECT g.*, GROUP_CONCAT(ge.name) AS genre_names
       FROM games g
       LEFT JOIN game_genres gg ON g.id = gg.game_id
       LEFT JOIN genres ge ON gg.genre_id = ge.id
       WHERE g.id = ?
       GROUP BY g.id`,
      [id]
    );
    if (!game[0]) return null;
    const g = game[0];
    return {
      id: g.id,
      name: g.name,
      description: g.description,
      released: g.released,
      metacritic: g.metacritic,
      esrb: g.esrb_rating,
      img: g.img,
      genres: g.genre_names ? g.genre_names.split(',') : [],
    };
  } catch (error) {
    console.error('erreur server (getGameById)', error.message);
    throw error;
  }
};