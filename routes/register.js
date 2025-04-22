const { Router } = require("express");
const router = Router();

const registerCon = require("../controllers/registerController");

router.post("/", registerCon.createUser);

module.exports = router;