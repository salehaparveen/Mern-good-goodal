const mongoose = require("mongoose");
const Product = require("../models/productModel");
const cloudinary = require("../utils/cloudinary");

// CREATE
const createProduct = async (req, res) => {
  const {
    category,
    name,
    price,
    imgOne,
    imgTwo,
    description: [{ detailOne, detailTwo }],
  } = req.body;
  // console.log({ detailOne });

  // adding data to db
  try {
    // Upload an image to Cloudinary
    const result1 = await cloudinary.uploader.upload(imgOne, {
      folder: "goodal-products",
    });

    const result2 = await cloudinary.uploader.upload(imgTwo, {
      folder: "goodal-products",
    });

    const product = await Product.create({
      category,
      name,
      price,
      imgOne: {
        public_id: result1.public_id,
        url: result1.secure_url,
      },
      imgTwo: {
        public_id: result2.public_id,
        url: result2.secure_url,
      },
      description: [{ detailOne, detailTwo }],
    });

    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

// READ ALL
const readProducts = async (req, res) => {
  const sortOrder = req.query.sort;

  const sortObject =
    sortOrder === "oldest" ? { createdAt: 1 } : { createdAt: -1 };

  try {
    const product = await Product.find({}).sort(sortObject);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ ONE
const readProduct = async (req, res) => {
  const { id } = req.params;

  // checks if id is not valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "id is not valid" });
  }

  // if id is valid then it will try to find the data
  const product = await Product.findById(id);

  // checks if data doesnt exist
  if (!product) {
    return res.status(400).json({ error: "workout not found" });
  }

  res.status(200).json(product);
};

// UPDATE
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "id is not valid" });
  }

  const product = await Product.findByIdAndUpdate(id, post, { new: true });

  if (!product) {
    return res.status(400).json({ error: "workout not found" });
  }

  res.status(200).json(product);
};

// DELETE
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "id is not valid" });
  }

  const product = await Product.findByIdAndRemove(id);

  if (!product) {
    return res.status(400).json({ error: "workout not found" });
  }

  res.status(200).json(product);
};

module.exports = {
  createProduct,
  readProducts,
  readProduct,
  updateProduct,
  deleteProduct,
};
