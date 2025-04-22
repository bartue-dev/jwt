const { Router } = require("express")
const router = Router();

const signInCon = require("../controllers/signinController")

router.post("/", signInCon.handleSignin);

module.exports= router;

