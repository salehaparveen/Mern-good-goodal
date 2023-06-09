const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, "Please add a product Name"],
    },
    price: {
      type: Number,
      required: true,
    },
    imgOne: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    imgTwo: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
        required: true,
      },
    },
    description: [
      {
        _id: false,
        detailOne: {
          type: String,
          required: true,
        },
        detailTwo: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

// imgOne: {
//   public_id: {
//     type: String,
//     required: true,
//   },
//   url: {
//     type: String,
//     required: true,
//   },
// },
// imgTwo: {
//   public_id: {
//     type: String,
//     required: true,
//   },
//   url: {
//     type: String,
//     required: true,
//   },
// },
