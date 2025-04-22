const asyncHander = require("express-async-handler");
const { peopleMethods, userMethods } = require("../../db/queries");

async function cookiesHelper(req, res) {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401).json({message: "Wrong token"})

  const refreshToken = cookies.jwt;
  const currentUser = await userMethods.currentUserToken(refreshToken);

  if (!currentUser) return res.status(403).json("User not allowed")

  return {refreshToken, currentUser}
}

exports.readPeople = asyncHander(async (req, res) => {
  const { currentUser } = await cookiesHelper(req, res);

  const people = await peopleMethods.readPeople(currentUser.userId);

  res.status(200).json(people);
});

exports.createPeople = asyncHander(async (req, res) => {
  const personData = req.body;
  
  if (!personData) return res.status(500).json({message: "Invalid data"})

  const { currentUser } = await cookiesHelper(req, res);
    
  console.log(currentUser);

  await peopleMethods.createPeople(
    {
    firstName:personData.firstName,
    lastName:personData.lastName,
    email:personData.email,
    phoneNumber: personData.phoneNumber,
    userId: currentUser.userId
    },
    );

  res.status(200).json({personData: personData});
});

exports.updatePeople = asyncHander(async (req, res) => {
  const { personId } = req.params;
  const personData = req.body;

  if (!personId) return res.status(500).json({message: "Invalid params"});

  await peopleMethods.updatePeople(Number(personId), {
    firstName: personData.firstName,
    lastName: personData.lastName,
    email: personData.email,
    phoneNumber: personData.phoneNumber
  });

  res.status(200).json({message: "Updated successfully"});
});

exports.deletePeople = asyncHander(async (req, res) => {
  const { personId } = req.params;

  if (!personId) return res.status(500).json({message: "Invalid Params"});

  await peopleMethods.deletePeople(Number(personId));

  res.status(200).json({message: "Deleted successfully!"})
});