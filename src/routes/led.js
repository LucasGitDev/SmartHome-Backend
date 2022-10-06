const express = require("express");

const router = express.Router();

const ledController = require("../controllers/led");

router.post("", ledController.setStatus);
router.get("/status", ledController.status);

module.exports = router;
