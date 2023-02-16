const express = require("express");
const router = express();
const products = require("./products.js");

router.use("/productos", products);

module.exports = router;
