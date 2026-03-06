import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies["token"];
  if (!token) {
    return res.status(401).json({ message: "token manquant" });
  }
  jwt.verify(token, process.env.JWT_SECRET,(err, decoded) => {
    if(err){
        return res.status(401).json({message: 'token non valide'});
    }
    req.user = decoded;
    next();
  })
}


export const isAdmin = (req, res, next) => {
    const {role} = req.user;
   if (role !== 'admin') {
        return res.status(401).json({message: "vous n'avez pas les droits"});
    }
    next();
}