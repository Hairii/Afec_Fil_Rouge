import {getComments, createComments, deleteComments, getCommentsByGame} from '../models/comments.model.js';

export const getAllComments = async (req, res) => {
    try{
        const comment = await getComments();
        res.json (comment);
    }catch(error){
        console.error(error);
        res.status(500).json ({message: 'erreur server (getAllComments'})
    }
};

//mannque le schema de Joi pour eviter injection sql
export const addComments  = async (req, res) => {
    try{
        const {content, gameID} = req.body;
        const userID = req.user.id; // recuperer par le token
        await createComments({content, userID, gameID});
        res.status(201).json ({message: "commentaire créer"});
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'erreur server (creatComments'});
    }
};

export const removeComments = async (req, res) => {
    try{
        const {id} = req.params;
        const deleted = await deleteComments(id);
        if(!deleted){
return res.status(404).json({message: 'commentaire non trouvé'});
        }
        res.status(200).json({message: 'commentaire supprimé'});
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'erreur server (deleteComments'});
    }   
};


export const getCommentByGame = async (req, res) => {
    try{
        const {game_id} = req.params;
        const comments = await getCommentsByGame(game_id);
        res.json(comments);
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'erreur server (getCommentsByGame)'});
    }   
}
