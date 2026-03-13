import Joi from 'joi';

export const ratingSchema = Joi.object({
    gameID: Joi.number().required(),
    rating: Joi.number().min(1).max(5).required(),
})