import Joi from 'joi';

export const registerSchema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    mail: Joi.string().email().required(),
    password: Joi.string().min(8).required(), 
   confirmPassword: Joi.string().valid(Joi.ref('password')).required(),// ref au password pour verif si c'est le même
})

export const loginSchema = Joi.object({
    mail: Joi.string().email().required(),
    password: Joi.string().required(), 
})