const express = require("express");
const {findOrCreateUser, getUser} = require("../controllers/users");

const router = express();

router.get("/:email", getUser);
router.post("/", findOrCreateUser);

module.exports = router;
