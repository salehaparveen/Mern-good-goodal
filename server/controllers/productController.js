const mongoose = require("mongoose");
const Product = require("../models/productModel");
const cloudinary = require("../utils/cloudinary");

// CREATE
const createProduct = async (req, res) => {
  // console.log({ detailOne });

  const post = req.body;

  // console.log(post.description[0].detailOne);

  // for errors
  let emptyFields = [];

  if (!post.category) {
    emptyFields.push("category");
  }
  if (!post.name) {
    emptyFields.push("name");
  }
  if (!post.price) {
    emptyFields.push("price");
  }
  if (!post.imgOne) {
    emptyFields.push("imgOne");
  }
  if (!post.imgTwo) {
    emptyFields.push("imgTwo");
  }

  // if (!post.description[0].detailOne) {
  //   emptyFields.push("detailOne");
  // }
  // if (!post.description[0].detailTwo) {
  //   emptyFields.push("detailTwo");
  // }

  post.description.forEach((desc, index) => {
    if (!desc.detailOne) {
      emptyFields.push(`description[${index}].detailOne`);
    }
    if (!desc.detailTwo) {
      emptyFields.push(`description[${index}].detailTwo`);
    }
  });

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Fill in all fields.", emptyFields });
  }

  // adding data to db
  try {
    // Upload an image to Cloudinary
    const result1 = await cloudinary.uploader.upload(post.imgOne, {
      folder: "goodal-products",
    });

    const result2 = await cloudinary.uploader.upload(post.imgTwo, {
      folder: "goodal-products",
    });

    const product = await Product.create({
      ...post,
      imgOne: {
        public_id: result1.public_id,
        url: result1.secure_url,
      },
      imgTwo: {
        public_id: result2.public_id,
        url: result2.secure_url,
      },
    });

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// READ ALL
const readProducts = async (req, res) => {
  try {
    const sortObject =
      req.query.sort === "oldest" ? { createdAt: 1 } : { createdAt: -1 };

    const search = req.query.search || "";
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 9;

    let category = req.query.category || "All";

    const categoryOptions = await Product.distinct("category");

    category === "All"
      ? (category = categoryOptions)
      : (category = req.query.category.split(","));

    const productsData = await Product.find({
      name: { $regex: search, $options: "i" },
    })
      .where("category")
      .in(category)
      .sort(sortObject)
      .skip(page * limit)
      .limit(limit);

    const total = await Product.countDocuments({
      category: { $in: [...category] },
      name: { $regex: search, $options: "i" },
    });

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      categories: categoryOptions,
      productsData,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ ONE
const readProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "id is not valid" });
  }

  try {
    // if id is valid then it will try to find the data
    const product = await Product.findById(id);

    // checks if data doesnt exist
    if (!product) {
      return res.status(400).json({ error: "product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "id is not valid" });
  }

  // for errors
  let emptyFields = [];

  if (!post.category) {
    emptyFields.push("category");
  }
  if (!post.name) {
    emptyFields.push("name");
  }
  if (!post.price) {
    emptyFields.push("price");
  }
  if (!post.imgOne) {
    emptyFields.push("imgOne");
  }
  if (!post.imgTwo) {
    emptyFields.push("imgTwo");
  }

  post.description.forEach((desc, index) => {
    if (!desc.detailOne) {
      emptyFields.push(`description[${index}].detailOne`);
    }
    if (!desc.detailTwo) {
      emptyFields.push(`description[${index}].detailTwo`);
    }
  });

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Fill in all fields.", emptyFields });
  }

  try {
    const currentProduct = await Product.findById(id);

    const data = {
      ...post,
    };

    if (!currentProduct) {
      return res.status(400).json({ error: "product not found" });
    }

    if (post.imgOne !== "") {
      const imgId1 = currentProduct.imgOne.public_id;

      // if the current image is same as the image in the input
      //  we will upload a new image
      if (imgId1 !== post.imgOne.public_id) {
        if (imgId1) {
          await cloudinary.uploader.destroy(imgId1);
        }

        // Upload an image to Cloudinary
        const newImage1 = await cloudinary.uploader.upload(post.imgOne, {
          folder: "goodal-products",
        });

        data.imgOne = {
          public_id: newImage1.public_id,
          url: newImage1.secure_url,
        };
      }
    }

    if (post.imgTwo !== "") {
      const imgId2 = currentProduct.imgTwo.public_id;

      if (imgId2 !== post.imgTwo.public_id) {
        if (imgId2) {
          await cloudinary.uploader.destroy(imgId2);
        }

        // Upload an image to Cloudinary
        const newImage2 = await cloudinary.uploader.upload(post.imgTwo, {
          folder: "goodal-products",
        });

        data.imgTwo = {
          public_id: newImage2.public_id,
          url: newImage2.secure_url,
        };
      }
    }

    const product = await Product.findByIdAndUpdate(id, data, { new: true });

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "id is not valid" });
  }

  try {
    const product = await Product.findById(id);
    //retrieve current image ID
    const imgIdOne = product.imgOne.public_id;
    if (imgIdOne) {
      await cloudinary.uploader.destroy(imgIdOne);
    }

    const imgIdTwo = product.imgTwo.public_id;
    if (imgIdTwo) {
      await cloudinary.uploader.destroy(imgIdTwo);
    }

    const DeletedProduct = await Product.findByIdAndRemove(id);

    if (!DeletedProduct) {
      return res.status(400).json({ error: "product not found" });
    }

    res.status(200).json(DeletedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  readProducts,
  readProduct,
  updateProduct,
  deleteProduct,
};
