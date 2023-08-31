import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      //      require: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      type: Boolean,
    },
    // varients: [
    //   {
    //     varient: {
    //       type: String,
    //       default: "small",
    //     },

    //     quantity: Number,
    //     price: Number,
    //   },
    //   {
    //     varient: {
    //       type: String,
    //       default: "medium",
    //     },
    //     quantity: Number,
    //     price: Number,
    //   },
    //   {
    //     varient: {
    //       type: String,
    //       default: "large",
    //     },
    //     quantity: Number,
    //     price: Number,
    //   },
    // ],
  },
  { timestamps: true }
);

export default mongoose.model("products", productSchema);
