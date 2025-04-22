require("dotenv").config();
const bcrypt = require("bcryptjs");
const asyncHander = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { userMethods, tokenMethods } = require("../db/queries")

exports.handleSignin = asyncHander(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) return res.status(400).json({message:"username and password required"})

  const currentUser = await userMethods.currentUser(username);

  console.log(currentUser)

  if (!currentUser) return res.sendStatus(401);

  const match = await bcrypt.compare(password, currentUser.password);

  if (match) {
    //create JWTs
    
    // access token
    const accessToken = jwt.sign(
      { "id": currentUser.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    // refresh token

    const refreshToken = jwt.sign(
      { "id": currentUser.id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    //saving refreshToken with current user
    await tokenMethods.savetoken(currentUser.id, refreshToken);
    
    res.cookie(
      "jwt",
      refreshToken,
      {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
      }
    );
    res.json({ accessToken, refreshToken })
  } else {
    res.sendStatus(401);
  }
});
