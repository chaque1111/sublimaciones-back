const express = require("express");
const router = express();
const products = require("./products.js");
const users = require("./users");
router.use("/productos", products);
router.use("/usuarios", users);
module.exports = router;
