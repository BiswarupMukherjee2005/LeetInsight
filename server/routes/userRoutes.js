const express = require("express");
const { getUserStats } = require("../controllers/userController");

const router = express.Router();

router.get("/user/:username", getUserStats);

module.exports = router;