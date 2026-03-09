import { getGames, getGameById} from '../models/game.model.js';


//recuperer tous les jeux
export const getAllGames = async (req, res) => {
    try{
        const games = await getGames();
        res.status(200).json(games);
    }catch(error){
        console.error('erreur server(getAllGames)',error.message);
    }
}

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