const express = require("express");

// controllers
const {
  customerSignup,
  customerLogin,
} = require("../controllers/customerController");

const router = express.Router();

// SIGNUP
router.post("/signup", customerSignup);

// LOGIN
router.post("/login", customerLogin);

module.exports = router;
