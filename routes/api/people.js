const { Router } = require("express");
const router = Router();

const peopleCon = require("../../controllers/api/peopleController");

router.post("/add-people", peopleCon.createPeople);

router.get("/", peopleCon.readPeople);

router.put("/update/:personId", peopleCon.updatePeople);

router.delete("/delete/:personId", peopleCon.deletePeople);

module.exports = router;