const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Oi mundo!");
});

module.exports = { router };