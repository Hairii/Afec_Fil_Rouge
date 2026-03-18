import argon2 from "argon2";
import jwt from "jsonwebtoken";

import { createUser, getUserByMail } from "../models/auth.model.js";
import { registerSchema, loginSchema } from "../validations/auth.validation.js";

//register user
export const register = async (req, res) => {
  try {
    const { mail, password, username } = req.body;
    const { error } = registerSchema.validate(req.body); // reagarde si le schema de Joi est bon
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const existingUser = await getUserByMail(mail);
    if (existingUser) {
      return res.status(400).json({ message: "mail deja utilisé" });
    }
    const hash = await argon2.hash(password);

    await createUser({ mail, password: hash, username });
    res.status(200).json({ message: "user créé" });
  } catch (error) {
    console.error("erreur register", error.message);
    res.status(500).json({ message: "server error(register)" });
  }
};

//login
export const login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    const { mail, password } = req.body;
    const user = await getUserByMail(mail);
    if (!user) {
      return res.status(400).json({ message: "identifiant invalide" });
    }
    const ValidPassword = await argon2.verify(user.password, password);
    if (!ValidPassword) {
      return res.status(400).json({ message: "identifiant invalide" });
    }
    //creation token
    const token = jwt.sign(
      {
        id: user.id,
        mail: user.mail,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );
    //stock le token dasn un cookies securisé
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1day
    });
    res.json({ message: "Connexion réussie", token: token, userID: user.id });
  } catch (error) {
    console.error("erreur login", error.message);
    res.status(500).json({ message: "server error(login)" });
  }
};


export const logout = (req, res) => {
  res.clearCookie('token', {
     httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
  res.json({message: 'Deconnexion réussie'});
}

//pour avoir les infos de l'utilisateur via le cookie/token
export const user = (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    role: req.user.role,
  });
};