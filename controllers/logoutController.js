require("dotenv").config();
const asyncHander = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { userMethods, tokenMethods } = require("../db/queries")

exports.handleLogout = asyncHander(async (req, res) => {

  // note: on client, also delete the accessToken

  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(204).json({message: "204 No content"})

  const refreshToken = cookies.jwt;

  //is refreshToken in db
  const currentUser = await userMethods.currentUserToken(refreshToken);
  if (!currentUser) {
    res.clearCookie(
      "jwt",
       { 
        httpOnly: true,
        sameSite: "None",
        secure: true 
      });
      return res.status(204).json({message: "204 no user"});
  }

  //delete refreshToken in db
  await tokenMethods.deleteRefreshToken(refreshToken);

  res.clearCookie(
    "jwt",
     { 
      httpOnly: true,
      sameSite: "None",
      secure: true 
    });
    return res.status(204).json({message: "refreshToken deleted"});
});
