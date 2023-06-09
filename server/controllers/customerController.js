const Customer = require("../models/customerModel");
const jwt = require("jsonwebtoken");

// create token function. we can use this function many times
// userid + secret = token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// SIGNUP
const customerSignup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const customer = await Customer.signup(
      firstName,
      lastName,
      email,
      password
    );

    const customerfirstName = customer.firstName;

    const token = createToken(customer._id);

    res.status(200).json({ customerfirstName, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// LOGIN
const customerLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const customer = await Customer.login(email, password);

    const customerfirstName = customer.firstName;

    const token = createToken(customer._id);

    res.status(200).json({ customerfirstName, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  customerSignup,
  customerLogin,
};
