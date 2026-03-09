import {getComments, createComments, deleteComments, getCommentsByGame} from '../models/comments.model.js';

export const getAllComments = async (req, res) => {
    try{
        const comment = await getComments();
        res.json (comments);
    }catch(error){
        console.error(error);
        res.status(500).json ({message: 'erreur server (getAllComments'})
    }
};


export 