const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    default: 0,
  },
});

// signup static method
AdminSchema.statics.signup = async function (email, password) {
  // validation .. check if email and password inputs are empty
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  // validation .. check if email is a valid email
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  // validation .. check if password is a strong email
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is weak");
  }

  // find the user that has the same value as the email
  // this will return the whole user document
  const emailExist = await this.findOne({ email });

  // check if the email already exist
  // users cannot have same email
  // if user tries to sign up with an email that is already exist ..
  // it throws an error
  if (emailExist) {
    throw Error("Email is already in use by another user");
  }

  // my password = KimMinju0829
  // salt = asdc9874s4 .. this is random
  const salt = await bcrypt.genSalt(10);
  // combine the salt and password together
  // hash = KimMinju0829asdc9874s4
  // it will be a hash passowrd exmple .. $djfdjd2143n87461513
  const hash = await bcrypt.hash(password, salt);

  // store in the database .. creates a document with email and pass
  const admin = await this.create({ email, password: hash });

  return admin;
};

// login static method
AdminSchema.statics.login = async function (email, password) {
  // validation .. check if email and password inputs are empty
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  // find the user that has the same value as the email
  // this will return the whole user document
  const admin = await this.findOne({ email });

  // check if the email doesn't exist
  // if user tries to log in with an email that doesnt exist or incorrect ..
  // it throws an error
  if (!admin) {
    throw Error("Email doesn't exist or Incorrect Email");
  }

  // macthing the password
  // password from user types in login form and password from the database
  // bcrypt will return true (match) or false (not match)
  const match = await bcrypt.compare(password, admin.password);

  // check if it doesnt match
  if (!match) {
    throw Error("Password doesn't exist or Incorrect Password");
  }

  // if it is match then return the user document
  return admin;
};

module.exports = mongoose.model("Admin", AdminSchema);
