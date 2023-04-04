const express = require("express");
const {route} = require("express/lib/application");
const {findOrCreateUser, getUser, deleteUser} = require("../controllers/users");

const router = express();

router.put("/login", getUser);
router.post("/create", findOrCreateUser);
router.delete("/delete", deleteUser);
module.exports = router;
