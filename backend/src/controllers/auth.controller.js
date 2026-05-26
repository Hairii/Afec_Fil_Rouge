import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { createUser, getUserByMail } from "../models/auth.model.js";
import { registerSchema, loginSchema } from "../validations/auth.validation.js";

const generateAccessToken = (user) =>
  jwt.sign(
    { id: user.id, mail: user.mail, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
//register user
const generateRefreshToken = (user) =>
  jwt.sign(
    { id: user.id, mail: user.mail, username: user.username, role: user.role },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  //stock le token dans un cookies securisé
const cookieOptions = (maxAge) => ({
  httpOnly: true,
  sameSite: "strict",
  secure: process.env.NODE_ENV === "production",
  maxAge,
});


export const register = async (req, res) => {
  try {
    const { mail, password, username } = req.body;
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const existingUser = await getUserByMail(mail);
    if (existingUser) return res.status(400).json({ message: "mail deja utilisé" });

    const hash = await argon2.hash(password);
    await createUser({ mail, password: hash, username });
    res.status(200).json({ message: "user créé" });
  } catch (error) {
    console.error("erreur register", error.message);
    res.status(500).json({ message: "server error(register)" });
  }
};

// créer un access token + refresh token
export const login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { mail, password } = req.body;
    const user = await getUserByMail(mail);
    if (!user) return res.status(400).json({ message: "identifiant invalide" });

    const validPassword = await argon2.verify(user.password, password);
    if (!validPassword) return res.status(400).json({ message: "identifiant invalide" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("token", accessToken, cookieOptions(15 * 60 * 1000));           // 15min
    res.cookie("refreshToken", refreshToken, cookieOptions(7 * 24 * 60 * 60 * 1000)); // 7j

    res.json({ message: "Connexion réussie", userID: user.id });
  } catch (error) {
    console.error("erreur login", error.message);
    res.status(500).json({ message: "server error(login)" });
  }
};

// recréer accesToken 
export const refresh = async (req, res) => {
  try {
    const accessToken = generateAccessToken(req.user);
    res.cookie("token", accessToken, cookieOptions(15 * 60 * 1000));
    res.json({ message: "token rafraîchi" });
  } catch (error) {
    console.error("erreur refresh", error.message);
    res.status(500).json({ message: "server error(refresh)" });
  }
};

//supp les 2 cookies
export const logout = (req, res) => {
  res.clearCookie("token", cookieOptions(0));
  res.clearCookie("refreshToken", cookieOptions(0));
  res.json({ message: "Deconnexion réussie" });
};

//pour avoir les infos de l'utilisateur via le cookie/token
export const user = (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    role: req.user.role,
  });
};