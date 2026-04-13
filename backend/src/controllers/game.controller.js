import { getGames, getGameById } from '../models/game.model.js';


//recuperer tous les jeux
export const getAllGames = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || '';
    const genres = req.query.genres ? req.query.genres.split(',') : [];
    const sort = req.query.sort || '';

    const result = await getGames({ page, search, genres, sort });
    res.status(200).json(result);
  } catch (error) {
    console.error('erreur server (getAllGames)', error.message);
    res.status(500).json({ message: 'erreur server (getAllGames)' });
  }
};

//recuper un seul jeu
export const getOneGame = async (req, res) => {
    try{
        const game = await getGameById(req.params.id);
        if(!game){
            return res.status(404).json({message: 'Jeu non trouvé'})
        }
        res.status(200).json(game);
    }catch(error){
        console.error('erreur server(getOneGame)',error.message);   
    }
}