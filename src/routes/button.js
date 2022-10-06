const express = require("express");

const router = express.Router();

const button = require("../controllers/button");

router.post("", button.setStatus);
router.get("/status", button.status);

module.exports = router;
