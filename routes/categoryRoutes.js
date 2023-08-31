import express from "express";
import { isAdmin, requireSiggnIn } from "../middlewares/authMiddleware.js";
import  {

    categoryController,
  createCategoryController,
  deleteCategoryController,
  singlecategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

//routes
//create category
router.post(
  "/create-catogory",
  requireSiggnIn,
  isAdmin,
  createCategoryController
);
// update category

router.put(
  "/update-category/:id",
  requireSiggnIn,
  isAdmin,
  updateCategoryController
);

//getall category

router.get("/get-category",categoryController);


//single category from the list
 
router.get('/single-category/:slug',singlecategoryController)

//delete category 

router.delete('/delete-category/:id',requireSiggnIn,isAdmin,deleteCategoryController)

export default router;
