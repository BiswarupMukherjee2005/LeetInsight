const express = require("express");
const { compareUsers } = require("../controllers/compareController");

const router = express.Router();

router.get("/:user1/:user2", compareUsers);

module.exports = router;