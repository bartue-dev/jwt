const bcrypt = require("bcryptjs");
const asyncHander = require("express-async-handler");

const { userMethods } = require("../db/queries")


exports.createUser = asyncHander(async (req, res) => {
  const { username, password } = req.body;

  const hashPassword = await bcrypt.hash(password, 10)

  await userMethods.createUser({
    username,
    password: hashPassword
  });

  res.status(200).json({message: "Successfully registered"});
});
