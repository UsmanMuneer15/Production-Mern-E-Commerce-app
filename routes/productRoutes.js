import express from "express";
import { isAdmin, requireSiggnIn } from "../middlewares/authMiddleware.js";
import {
  brainTreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProduct,
  getSingleProductController,
  getproductController,
  productCategoryController,
  productCpuntController,
  productFiltersController,
  productListController,
  productPhotoController,
  searchProductController,
  updateProductController,
} from "../controllers/productcontroller.js";
import formidable from "express-formidable";
import { get } from "mongoose";
const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSiggnIn,
  isAdmin,
  formidable(),
  createProductController
);
//update product
router.put(
  "/update-product/:pid",
  requireSiggnIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get products

router.get("/get-product", getproductController);

//get single product

router.get("/get-product/:slug", getSingleProductController);

//get photo

router.get("/product-photo/:pid", productPhotoController);

//delete product

router.delete("/delete-product/:pid", deleteProduct);

//filter product

router.post("/product-filters", productFiltersController);

// product count pagination
router.get("/product-count",productCpuntController)

//product per page 

router.get("product-list/:page",productListController)

//search product

router.get("/search/:keyword",searchProductController)

//similar product 

// router.get('/related-product/:pid/:cid', relatedProductController)

//category wise product 

router.get("/product-category/:slug",productCategoryController)


//payment routes
//token

router.get('/braintree/token',braintreeTokenController)


//payment 

router.post("/braintree/payment",requireSiggnIn,brainTreePaymentController)
export default router;
