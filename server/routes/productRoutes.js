const express = require("express");

// controllers
const {
  createProduct,
  readProducts,
  readProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { requireAuth, isAdmin } = require("../middleware/requireAuth");

const router = express.Router();

// run this middleware function before the crud operations below
// we need to protect those routes below
// they have to be authenticated first before they can do all of crud below
router.use(requireAuth);

// CRUD ////////////////////////
// CREATE
router.post("/", createProduct);

// READ ALL
router.get("/", readProducts);

// READ ONE
router.get("/:id", readProduct);

// UPDATE
router.patch("/:id", updateProduct);

// DELETE
router.delete("/:id", deleteProduct);

module.exports = router;
