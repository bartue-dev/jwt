const { Router } = require("express");
const router = Router();

const logoutCon = require("../controllers/logoutController");

router.get("/", logoutCon.handleLogout);

module.exports = router;