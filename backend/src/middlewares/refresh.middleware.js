import jwt from "jsonwebtoken";

export const verifyRefreshToken = (req, res, next) => {
  const token = req.cookies["refreshToken"];
  if (!token) {
    return res.status(401).json({ message: "refresh token manquant" });
  }
  jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "refresh token invalide ou expiré" });
    }
    req.user = decoded;
    next();
  });
};
