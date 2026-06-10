import Joi from 'joi';

export const registerSchema = Joi.object({
    username: Joi.string().min(3).max(20).required(),

     mail: Joi.string()
        .email()
        .trim()
        .lowercase()
        .required()
        .messages({
            'string.email': 'format de mail incorrect',
        }),

    password: Joi.string()
        .min(8)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
        .required()
        .messages({
            'string.min': 'Le mot de passe est trop court (minimum 8 caractères)',
            'string.pattern.base': 'Le mot de passe doit contenir majuscule, minuscule et chiffre',
            
        }),

    confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': 'Les mots de passe ne correspondent pas',
        }),
});

export const loginSchema = Joi.object({
    mail: Joi.string()
        .email()
        .trim()
        .lowercase()
        .required()
        .messages({
            'string.email': 'format de mail incorrect',
        }),

    password: Joi.string().required(),
});