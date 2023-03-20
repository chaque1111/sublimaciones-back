const express = require("express");
const {findOrCreateUser, getUser} = require("../controllers/users");

const router = express();

router.put("/login", getUser);
router.post("/create", findOrCreateUser);

module.exports = router;
