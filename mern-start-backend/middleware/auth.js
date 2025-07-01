// const jwt = require("jsonwebtoken");
// const JWT_SECRET = "mysecretkey";

// function auth(req, res, next) {
//   const token = req.header("x-auth-token");
//   if (!token) return res.status(401).json({ msg: "No token, access denied" });

//   try {
//     const verified = jwt.verify(token, JWT_SECRET);
//     req.user = verified.id;
//     next();
//   } catch (err) {
//     res.status(400).json({ msg: "Invalid token" });
//   }
// }

// module.exports = auth;


// middleware/auth.js
// const jwt = require('jsonwebtoken');
// const JWT_SECRET = "sherry_secret"; // same as used in auth.js

// const verifyToken = (req, res, next) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');
//   if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);  
//     req.user = decoded; // attach user data to req
//     next();
//   } catch (err) {
//     res.status(400).json({ message: "Invalid token." });
//   }
// };

// module.exports = verifyToken;

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "sherrySecretKey");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

module.exports = verifyToken;

