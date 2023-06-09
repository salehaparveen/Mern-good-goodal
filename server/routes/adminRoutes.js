const express = require("express");

// controllers
const { adminSignup, adminLogin } = require("../controllers/adminController");

const router = express.Router();

// SIGNUP
router.post("/signup", adminSignup);

// LOGIN
router.post("/login", adminLogin);

module.exports = router;
