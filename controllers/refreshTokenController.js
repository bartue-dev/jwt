require("dotenv").config();
const asyncHander = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { userMethods } = require("../db/queries")

//refreshToken
exports.handleRefreshToken = asyncHander(async (req, res) => {
  const cookies = req.cookies;
  
  if (!cookies?.jwt) return res.status(401).json({message: "not allowed"})
    
  const refreshToken = cookies.jwt;
  const currentUser = await userMethods.currentUserToken(refreshToken);
  
  if (!currentUser) return res.status(401).json({message: "No user found"});

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err || currentUser.userId !== decoded.id) return res.status(403).json({message: "err in refresh verify token"});
      const accessToken = jwt.sign(
        {"id": decoded.id},
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30s" }
      );
      res.json({accessToken})
    }
  );
});
