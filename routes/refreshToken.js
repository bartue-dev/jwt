const { Router } = require("express");
const router = Router();

const refreshTokenCon = require("../controllers/refreshTokenController")

router.get("/", refreshTokenCon.handleRefreshToken);

module.exports = router;